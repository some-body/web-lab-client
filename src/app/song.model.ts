export class Song {
    id: any;
    title: string;
    singer: string;
    globalRating: number = 0;
    ratesCount: number = 0;
    imageSrc: string;

    userRating: number = 0;
    inCollection: boolean;


    get fullName(): string {
        return `${this.singer} – ${this.title}`;
    }

    constructor(obj = null) {
        if(!obj) {
            return;
        }
        this.id = obj.id;
        this.title = obj.title;
        this.singer = obj.singer;
        this.globalRating = obj.globalRating || 0;
        this.ratesCount = obj.ratesCount || 0;
        this.imageSrc = obj.imageSrc;

        this.userRating = obj.userRating || 0;
        this.inCollection = obj.inCollection || false;
    }
}