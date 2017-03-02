import { Component } from '@angular/core';
import { Song } from '../models/song.model';
import { MusicService } from '../services/music.service';

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
            .then(song => console.log('Сохранено')) // TODO: Нормальное уведомление.
            .then(() => this.clearForm());
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

    clearForm() {
        this.model = new Song();
        this.imgInputText = this.defaultImgInputText;
    }
}
