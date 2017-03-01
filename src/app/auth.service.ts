import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { LocalStorageService } from 'angular-2-local-storage';
import { Token } from './token.model';
import { User } from './user.model';
import { LoginResult } from './login-result.model';

@Injectable()
export class AuthService {
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
                private localStorageService: LocalStorageService) 
    {
    }

    login(login: string, password: string): Promise<void> {
        let endpoint = this.userApiEndpoint + '/login';
        return this.http.post(endpoint, {login: login, password: password})
            .map((res: Response) => this.extractData(res))
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
            .map((res: Response) => this.extractData(res))
            .toPromise();
    }

    private extractData(res: Response) {
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