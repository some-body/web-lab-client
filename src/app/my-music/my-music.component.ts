import { Component } from '@angular/core';
import { Song } from '../song.model';
import { MusicService } from '../music.service';

// Auth.
import { Router } from "@angular/router";
import { LoginRequired } from '../login-required.abstract';
import { AuthService } from '../auth.service';

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
        //this.initData();
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
