import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from "@angular/router";
import { Song } from '../song.model'
import { AuthService } from '../auth.service';
import { OnNavigationEnd } from '../on-navigation-end';

@Component({
    selector: 'song-cards-list',
    templateUrl: './song-cards-list.component.html',
    styleUrls: ['./song-cards-list.component.css'] 
})
export class SongCardsListComponent extends OnNavigationEnd {
    @Input() model: Song[];
    @Output() addToCollection: EventEmitter<Song> = new EventEmitter<Song>();
    @Output() removeFromCollection: EventEmitter<Song> = new EventEmitter<Song>();

    private isAuthorized: boolean;

    constructor(private router: Router, 
                private authService: AuthService) 
    {
        super(router);
    }

    onNavigationEnd() {
        this.isAuthorized = this.authService.isAuthorized;
    }

    add(song: Song) {
        this.addToCollection.emit(song);
    }

    remove(song: Song) {
        this.removeFromCollection.emit(song);
    }
}
