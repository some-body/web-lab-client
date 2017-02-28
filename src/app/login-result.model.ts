import { Token } from './token.model';

export class LoginResult {
    token: Token;
    username: string;

    static fromJSON(obj): LoginResult {
        let res = new LoginResult();
        res.username = obj.username;
        res.token = Token.fromJSON(obj.token);
        return res;
    }
}