export class User {
    login: string;
    password: string;
    name: string;

    static fromJSON(obj): User {
        let res = new User();
        res.login = obj.login;
        res.name = obj.name;
        return res;
    }
}