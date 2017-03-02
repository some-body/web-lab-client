import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { LocalStorageModule } from 'angular-2-local-storage';
import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { UserComponent } from './user/user.component';
import { TopMusicComponent } from './top-music/top-music.component';
import { MyMusicComponent } from './my-music/my-music.component';
import { AddNewSongComponent } from './add-new-song/add-new-song.component';
import { SongCardComponent } from './song-card/song-card.component';
import { SongCardsListComponent } from './song-cards-list/song-cards-list.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MusicService } from './music.service';
import { FilesService } from './files.service';
import { AuthService } from './auth.service';
import { SongsCollectionService } from './songs-collection.service';

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
            { path: 'add-new-song', component: AddNewSongComponent },
            { path: 'user', component: UserComponent }
        ],
    },
    { path: 'login', component: LoginComponent },
    { path: 'registration', component: RegistrationComponent },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    declarations: [
        AppComponent,
        MainPageComponent,
        UserComponent,
        TopMusicComponent,
        MyMusicComponent,
        AddNewSongComponent,
        SongCardComponent,
        SongCardsListComponent,
        LoginComponent,
        RegistrationComponent,
        PageNotFoundComponent
    ],
    imports: [
        RouterModule.forRoot(appRoutes),
        NgbModule.forRoot(),
        BrowserModule,
        FormsModule,
        HttpModule,
        LocalStorageModule.withConfig({
            prefix: 'app-root',
            storageType: 'localStorage'
        })
    ],
    providers: [MusicService, FilesService, AuthService, SongsCollectionService],
    bootstrap: [AppComponent]
})
export class AppModule { }
