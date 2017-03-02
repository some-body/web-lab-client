import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { Song } from '../models/song.model';
import { AuthService } from './auth.service';

@Injectable()
export class SongsCollectionService {
    private collectionApiEndpoint: string = 'http://localhost:4200/api/user/songs';

    constructor(private http: Http,
                private authService: AuthService) 
    {
    }

    getSongsCollection(): Promise<Song[]> {
        return this.http.get(this.collectionApiEndpoint, this.authService.requestOptions)
            .map(this.extractSongsData)
            .toPromise();
    }

    addToCollection(id: number): Promise<void> {
        const endpoint = this.collectionApiEndpoint + `/${id}`;
        return this.http.post(endpoint, { }, this.authService.requestOptions)
            .map((result: Response) => null)
            .toPromise();
    }

    removeFromCollection(id: number): Promise<void> {
        const endpoint = this.collectionApiEndpoint + `/${id}`;
        return this.http.delete(endpoint, this.authService.requestOptions)
            .map(r => null)
            .toPromise();
    }

    updateUserRating(id: number, newRating: number): Promise<Song> {
        const endpoint = this.collectionApiEndpoint + `/${id}/rate/${newRating}`;
        return this.http.post(endpoint, {}, this.authService.requestOptions)
            .map(this.extractSongData)
            .toPromise();
    }

    private extractSongsData(res: Response): Song[] {
        let songs = res.json();
        return songs.map(s => new Song(s));
    }

    private extractSongData(res: Response): Song {
        let song = res.json();
        return new Song(song);
    }
}