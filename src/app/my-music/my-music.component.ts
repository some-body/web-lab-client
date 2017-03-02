import { Component } from '@angular/core';
import { Song } from '../song.model';
import { MusicService } from '../music.service';
import { Router } from "@angular/router";
import { AuthService } from '../auth.service';
import { LoginRequired } from '../login-required.abstract';

@Component({
    selector: 'my-music',
    templateUrl: './my-music.component.html'
})
export class MyMusicComponent extends LoginRequired {
    songList: Song[] = [];

    constructor(private musicService: MusicService,
                router: Router,
                authService: AuthService)
    {
        super(router, authService);
        this.initData();
    }

    onNavigationEnd() {
        super.onNavigationEnd();
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
