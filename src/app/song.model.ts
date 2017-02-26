export class Song {
    id: number;
    title: string;
    singer: string;
    globalRating: number;
    userRating: number;
    imageSrc: string;
    inCollection: boolean;

    get fullName(): string {
        return `${this.singer} – ${this.title}`;
    }
}