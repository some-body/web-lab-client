import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Music } from '../music.model'

@Component({
    selector: 'music-card',
    templateUrl: './music-card.component.html',
    styleUrls: ['./music-card.component.css'] 
})
export class MusicCardComponent {
    @Input() model: Music;
    @Output() deleteFromCollection: EventEmitter<Music> = new EventEmitter<Music>();
    @Output() addToCollection: EventEmitter<Music> = new EventEmitter<Music>();
}
