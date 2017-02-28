export class Token {
    value: string;
    expires: Date;

    static fromJSON(obj): Token {
        let res = new Token();
        res.value = obj.value;
        res.expires = new Date(obj.expires);
        return res;
    }
}