import { Component } from '@angular/core';
import { Song } from '../song.model';
import { MusicService } from '../music.service';

@Component({
    selector: 'add-new-song',
    templateUrl: './add-new-song.component.html'
})
export class AddNewSongComponent {
    model: Song = new Song();
    defaultImgInputText = 'Выберите изображение'
    imgInputText = this.defaultImgInputText;
    imgFile = null;

    constructor(private musicService: MusicService) {
    }

    onSubmit() {
        this.musicService.addNewSong(this.model, this.imgFile)
            .then(song => console.log(song));
    }

    onImgInputChange(event) {
        let fileList = event.target.files;
        if(fileList.length > 0) {
            this.imgFile = fileList[0];
            this.imgInputText = this.imgFile.name;
        } else {
            this.imgInputText = this.defaultImgInputText;
        }
    }
}
