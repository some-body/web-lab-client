import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { AppComponent } from './app.component';
import { TopMusicComponent } from './top-music/top-music.component';
import { MyMusicComponent } from './my-music/my-music.component';
import { MainPageComponent } from './main-page/main-page.component';
import { MusicCardComponent } from './music-card/music-card.component';
import { MusicCardsListComponent } from './music-cards-list/music-cards-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const appRoutes: Routes = [
    { 
        path: '', 
        component: MainPageComponent,
        children: [
            { path: 'top', component: TopMusicComponent },
            { path: 'my-music', component: MyMusicComponent },
            {
                path: '',
                redirectTo: 'top',
                pathMatch: 'full'
            },
        ]
    },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    declarations: [
        AppComponent,
        MainPageComponent,
        TopMusicComponent,
        MyMusicComponent,
        MusicCardComponent,
        MusicCardsListComponent,
        PageNotFoundComponent
    ],
    imports: [
        RouterModule.forRoot(appRoutes),
        NgbModule.forRoot(),
        BrowserModule,
        FormsModule,
        HttpModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
