import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { Song } from './song.model';
import { UploadResult } from './upload-result.model';
import { FilesService } from './files.service';
import { SongsCollectionService } from './songs-collection.service';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class MusicService {
    private token: string = 'kokoko'; // TODO: Токен получать после авторизации.
    private apiEndpoint: string = 'http://localhost:4200/api/songs';
    private collectionApiEndpoint: string = 'http://localhost:4200/api/user/songs';
    private imagesApiEndpoint: string = 'http://localhost:4200/api/images';

    constructor(private http: Http, 
                private filesService: FilesService,
                private songsCollectionService: SongsCollectionService) 
    {
    }

    addNewSong(song: Song, imageFile: any): Promise<Song> {
        const imgEndpoint = this.imagesApiEndpoint;
        // TODO: Вынести в ImagesService.
        if(imageFile) {
            return this.filesService.upload(this.imagesApiEndpoint, imageFile)
                .then((uploadResult: UploadResult) => {
                    song.imageSrc = uploadResult.filename;
                    return this.uploadSong(song);
                });
        } else {
            song.imageSrc = null;
            return this.uploadSong(song);
        }
    }

    getSongsTop(): Promise<Song[]> {
        return this.http.get(this.apiEndpoint, this.getRequestOptions())
            .map((result: Response) => this.extractSongsData(result))
            .toPromise();
    }

    getSongsCollection(): Promise<Song[]> {
        return this.songsCollectionService.getSongsCollection();
    }

    updateUserRating(id: number, newRating: number): Promise<Song> {
        const endpoint = this.apiEndpoint + `/${id}`;
        return this.http.put(endpoint, { userRating: newRating }, this.getRequestOptions())
            .map((result: Response) => this.extractSongData(result))
            .toPromise();
    }

    addToCollection(id: number): Promise<void> {
        return this.songsCollectionService.addToCollection(id);
    }

    removeFromCollection(id: number): Promise<void> {
        return this.songsCollectionService.removeFromCollection(id);
    }

    private extractSongsData(res: Response): Song[] {
        let songs = res.json();
        return songs.map(s => new Song(s));
    }

    private extractSongData(res: Response): Song {
        let song = res.json();
        return new Song(song);
    }

    private uploadSong(song: Song): Promise<Song> {
        return this.http.post(this.apiEndpoint, song, this.getRequestOptions())
            .map((result: Response) => result.json())
            .map((result: Song) => result)
            .toPromise();
    }

    private getRequestOptions() {
        let headers = new Headers();
        headers.append('token', this.token);
        return { headers: headers };
    }
}