import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Song } from '../song.model'

@Component({
    selector: 'song-cards-list',
    templateUrl: './song-cards-list.component.html',
    styleUrls: ['./song-cards-list.component.css'] 
})
export class SongCardsListComponent {
    @Input() model: Song[];
    @Output() addToCollection: EventEmitter<Song> = new EventEmitter<Song>();
    @Output() removeFromCollection: EventEmitter<Song> = new EventEmitter<Song>();

    add(song: Song) {
        this.addToCollection.emit(song);
    }

    remove(song: Song) {
        this.removeFromCollection.emit(song);
    }
}
