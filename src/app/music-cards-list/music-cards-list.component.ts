import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Music } from '../music.model'

@Component({
    selector: 'music-cards-list',
    templateUrl: './music-cards-list.component.html',
    styleUrls: ['./music-cards-list.component.css'] 
})
export class MusicCardsListComponent {
    @Input() model: Music[];
}
