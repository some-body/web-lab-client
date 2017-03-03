import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { Song } from '../models/song.model';
import { UploadResult } from '../models/upload-result.model';
import { FilesService } from './files.service';
import { SongsCollectionService } from './songs-collection.service';
import { AuthService } from './auth.service';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class MusicService {
    private apiEndpoint: string = '/api/songs';
    private collectionApiEndpoint: string = '/api/user/songs';
    private imagesApiEndpoint: string = '/api/images';

    constructor(private http: Http, 
                private filesService: FilesService,
                private songsCollectionService: SongsCollectionService,
                private authService: AuthService)
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
        return this.http.get(this.apiEndpoint, this.authService.requestOptions)
            .map((result: Response) => this.extractSongsData(result))
            .toPromise();
    }

    getSongsCollection(): Promise<Song[]> {
        return this.songsCollectionService.getSongsCollection();
    }

    updateUserRating(id: number, newRating: number): Promise<Song> {
        return this.songsCollectionService.updateUserRating(id, newRating);
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
        return this.http.post(this.apiEndpoint, song, this.authService.requestOptions)
            .map((result: Response) => result.json())
            .map((result: Song) => result)
            .toPromise();
    }
}