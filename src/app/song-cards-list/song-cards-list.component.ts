import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Song } from '../models/song.model'
import { AuthService } from '../services/auth.service';
import { OnNavigationEnd } from '../on-navigation-end';

@Component({
    selector: 'song-cards-list',
    templateUrl: './song-cards-list.component.html',
    styleUrls: ['./song-cards-list.component.scss'] 
})
export class SongCardsListComponent {
    @Input() model: Song[];
    @Output() addToCollection: EventEmitter<Song> = new EventEmitter<Song>();
    @Output() removeFromCollection: EventEmitter<Song> = new EventEmitter<Song>();

    get isAuthorized(): boolean {
        return this.authService.isAuthorized;
    }

    constructor(private authService: AuthService) {
    }

    add(song: Song) {
        this.addToCollection.emit(song);
    }

    remove(song: Song) {
        this.removeFromCollection.emit(song);
    }
}
