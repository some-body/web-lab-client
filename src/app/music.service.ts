import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { Song } from './song.model';
import { UploadResult } from './upload-result.model';
import { FilesService } from './files.service';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class MusicService {
    private token: string = 'kokoko'; // TODO: Токен получать после авторизации.
    private apiEndpoint: string = 'http://localhost:4200/api/songs';
    private imagesApiEndpoint: string = 'http://localhost:4200/api/images';

    constructor(private http: Http, 
                private filesService: FilesService) 
    {
    }

    addNewSong(song: Song, imageFile: any): Promise<Song> {
        const imgEndpoint = this.imagesApiEndpoint;

        return this.filesService.upload(this.imagesApiEndpoint, imageFile)
            .then((uploadResult: UploadResult) => {
                song.imageSrc = uploadResult.filename;
                return this.http.post(this.apiEndpoint, song, this.getRequestOptions())
                    .map((result: Response) => result.json())
                    .map((result: Song) => result)
                    .toPromise();
            });
    }

    getSongsTop(): Promise<Song[]> {
        return this.http.get(this.apiEndpoint, this.getRequestOptions())
            .map((result: Response) => result.json())
            .map((result: Song[]) => result)
            .toPromise();
    }

    getSongsCollection(): Promise<Song[]> {
        const endpoint = this.apiEndpoint + `/collection`;

        return this.http.get(endpoint, this.getRequestOptions())
            .map((result: Response) => result.json())
            .map((result: Song[]) => result)
            .toPromise();
    }

    updateUserRating(id: number, newRating: number): Promise<number> {
        const endpoint = this.apiEndpoint + `/${id}`;
        return this.http.post(endpoint, { userRating: newRating }, this.getRequestOptions())
            .map((result: Response) => result.json())
            .map((result: Song) => result.userRating)
            .toPromise();
    }

    addToCollection(id: number): Promise<void> {
        const endpoint = this.apiEndpoint + `/${id}/addToCollection`;
        return this.http.post(endpoint, { }, this.getRequestOptions())
            .map((result: Response) => null)
            .toPromise();
    }

    removeFromCollection(id: number): Promise<void> {
        const endpoint = this.apiEndpoint + `/${id}/removeFromCollection`;
        return this.http.post(endpoint, { }, this.getRequestOptions())
            .map((result: Response) => null)
            .toPromise();
    }

    private getRequestOptions() {
        let headers = new Headers();
        headers.append('token', this.token);
        return { headers: headers };
    }
}