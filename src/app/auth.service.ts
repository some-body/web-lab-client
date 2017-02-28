import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { Token } from './token.model';
import { User } from './user.model';
import { LoginResult } from './login-result.model';

@Injectable()
export class AuthService {
    private userApiEndpoint = '/api/user';
    private loginResult: LoginResult;
    
    get token(): string {
        return this.loginResult ? this.loginResult.token.value : null;
    }

    get isAuthorized(): boolean {
        let currDate = new Date();
        return !!this.loginResult
            && !!this.loginResult.token
            && !!this.loginResult.token.expires
            && this.loginResult.token.expires > currDate;
    }

    get requestOptions() {
        let headers = new Headers();
        headers.append('token', this.token);
        return { headers: headers };
    }

    get username(): string {
        return this.loginResult ? this.loginResult.username : '';
    }

    constructor(private http: Http) {
        // TODO: Загружать токен из LocalStorage.
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
            .map(r => this.loginResult = null)
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
        this.loginResult = LoginResult.fromJSON(obj);
    }
}