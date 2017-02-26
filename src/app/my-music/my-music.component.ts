import { Component } from '@angular/core';
import { Song } from '../song.model';
import { MusicService } from '../music.service';

@Component({
    selector: 'my-music',
    templateUrl: './my-music.component.html'
})
export class MyMusicComponent {
    songList: Song[] = [];

    constructor(private musicService: MusicService) {
        this.initData();
    }

    removeFromCollection(song: Song) {
        this.musicService.removeFromCollection(song.id)
            .then(result => {
                let ind = this.songList.indexOf(song);
                this.songList.splice(ind, 1);
            });
    }

    private initData() {
        this.musicService.getSongsCollection()
            .then(songs => this.songList = songs);
    }
}
