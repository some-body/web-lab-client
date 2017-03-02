import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { LocalStorageService } from 'angular-2-local-storage';
import { Token } from '../models/token.model';
import { User } from '../models/user.model';
import { LoginResult } from '../models/login-result.model';
import { OnNavigationEnd } from '../on-navigation-end';
import { Router } from "@angular/router";

@Injectable()
export class AuthService extends OnNavigationEnd {
    private userApiEndpoint = '/api/user';
    private localstorageKey = 'login-result';
    
    get token(): string {
        let loginResult = this.getLoginResult();
        return loginResult ? loginResult.token.value : null;
    }

    get isAuthorized(): boolean {
        let loginResult = this.getLoginResult();
        if(!loginResult) {
            return false;
        }
        let currDate = new Date();
        let expiresDate = new Date(loginResult.token.expires);
        return true;
        //return expiresDate > currDate;
    }

    get requestOptions() {
        let headers = new Headers();
        headers.append('token', this.token);
        return { headers: headers };
    }

    get username(): string {
        let loginResult = this.getLoginResult();
        return loginResult ? loginResult.username : '';
    }

    constructor(private http: Http,
                private localStorageService: LocalStorageService,
                router: Router) 
    {
        super(router);
    }

    onNavigationEnd() {
        return this.http.get(this.userApiEndpoint, this.requestOptions)
            .map((res: Response) => this.extractUserData(res))
            .subscribe(() => {}, () => {    // Если все хорошо -- ничего не делаем.
                this.clearLoginResult();
                console.log('Необходима авторизация');
            });
    }

    getCurrentUser(): Promise<User> {
        return this.http.get(this.userApiEndpoint, this.requestOptions)
            .map((res: Response) => this.extractUserData(res))
            .toPromise();
    }

    login(login: string, password: string): Promise<void> {
        let endpoint = this.userApiEndpoint + '/login';
        return this.http.post(endpoint, {login: login, password: password})
            .map((res: Response) => this.extractLoginResultData(res))
            .toPromise();
    }

    logout(): Promise<void> {
        let endpoint = this.userApiEndpoint + '/logout';
        return this.http.post(endpoint, { }, this.requestOptions)
            .map(r => this.clearLoginResult())
            .toPromise();
    }

    registrate(user: User): Promise<void> {
        let endpoint = this.userApiEndpoint + '/register';
        return this.http.post(endpoint, user)
            .map((res: Response) => this.extractLoginResultData(res))
            .toPromise();
    }

    private extractUserData(res: Response): User {
        let obj = res.json();
        let user = User.fromJSON(obj);
        return user;
    }

    private extractLoginResultData(res: Response) {
        let obj = res.json();
        let loginResult = LoginResult.fromJSON(obj);
        this.setLoginResult(loginResult);
    }

    private clearLoginResult() {
        this.localStorageService.remove(this.localstorageKey);
    }

    private getLoginResult(): LoginResult {
        return this.localStorageService.get<LoginResult>(this.localstorageKey);
    }

    private setLoginResult(loginResult: LoginResult) {
        this.localStorageService.add(this.localstorageKey, loginResult);
    }
}