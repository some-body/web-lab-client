export class Music {
    id: number;
    title: string;
    singer: string;
    globalRaiting: number;
    userRaiting: number;
    imageSrc: string;

    get fullName(): string {
        return `${this.singer} – ${this.title}`;
    }
}