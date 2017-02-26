import { Component } from '@angular/core';
import { Song } from '../song.model';
import { MusicService } from '../music.service';

@Component({
    selector: 'top-music',
    templateUrl: './top-music.component.html'
})
export class TopMusicComponent {
    songList: Song[] = [];

    constructor(private musicService: MusicService) {
        this.initData();
    }

    addToCollection(song: Song) {
        this.musicService.addToCollection(song.id)
            .then(result => song.inCollection = true);
    }

    removeFromCollection(song: Song) {
        this.musicService.removeFromCollection(song.id)
            .then(result => song.inCollection = false);
    }

    private initData() {
        this.musicService.getSongsTop()
            .then(songs => this.songList = songs);
    }
}
