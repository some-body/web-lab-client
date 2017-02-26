import { Component } from '@angular/core';
import { Music } from '../music.model'

@Component({
    selector: 'top-music',
    templateUrl: './top-music.component.html'
})
export class TopMusicComponent {
    musicList: Music[] = [];

    constructor() {
        let music = new Music();
        music.id = 1;
        music.singer = 'JAM Project';
        music.title = 'THE HERO !!';
        music.globalRaiting = 7.5;
        music.userRaiting = 4;
        music.imageSrc = '/assets/img/opm.png';
        this.musicList.push(music);

        music = new Music();
        music.id = 2;
        music.singer = 'Saitama';
        music.title = 'One Puuuuuuunch';
        music.globalRaiting = 7.5;
        music.userRaiting = 4;
        music.imageSrc = '/assets/img/opm.png';
        this.musicList.push(music);

        music = new Music();
        music.id = 3;
        music.singer = 'Rick Astley';
        music.title = 'Never Gonna Give You Up';
        music.globalRaiting = 8;
        music.userRaiting = 9;
        music.imageSrc = '/assets/img/opm.png';
        this.musicList.push(music);

        music = new Music();
        music.id = 4;
        music.singer = 'Ontama';
        music.title = 'One Puuuuuuunch';
        music.globalRaiting = 7.5;
        music.userRaiting = 4;
        music.imageSrc = '/assets/img/opm.png';
        this.musicList.push(music);

        music = new Music();
        music.id = 5;
        music.singer = 'Gintama';
        music.title = 'One Puuuuuuunch';
        music.globalRaiting = 7.5;
        music.userRaiting = 4;
        music.imageSrc = '/assets/img/opm.png';
        this.musicList.push(music);

        music = new Music();
        music.id = 6;
        music.singer = 'Bandana';
        music.title = 'One Puuuuuuunch';
        music.globalRaiting = 7.5;
        music.userRaiting = 4;
        music.imageSrc = '/assets/img/opm.png';
        this.musicList.push(music);
    }
}
