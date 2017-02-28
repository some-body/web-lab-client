import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Song } from '../song.model';
import { MusicService } from '../music.service';

@Component({
    selector: 'song-card',
    templateUrl: './song-card.component.html',
    styleUrls: ['./song-card.component.css'] 
})
export class SongCardComponent {
    @Input() model: Song;
    @Input() isAuthorized: boolean;

    @Output() addToCollection: EventEmitter<Song> = new EventEmitter<Song>();
    @Output() removeFromCollection: EventEmitter<Song> = new EventEmitter<Song>();
    @Output() inCollectionChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(private musicService: MusicService) {
    }

    rateChange(newRating: number) {
        if(this.model.userRating === newRating) {
            return;
        }
        this.musicService.updateUserRating(this.model.id, newRating)
            .then((result: Song) => {
                this.model = result;
            });
    }

    add() {
        this.addToCollection.emit(this.model);
    }

    remove() {
        this.removeFromCollection.emit(this.model);
    }
}
