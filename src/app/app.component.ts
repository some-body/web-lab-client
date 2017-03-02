import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent {
    get isAuthorized(): boolean {
        return this.authService ? this.authService.isAuthorized : false;
    }

    get username(): string {
        return this.authService ? this.authService.username : '';
    }

    constructor(private router: Router,
                private authService: AuthService) 
    {
    }

    logout() {
        this.authService.logout()
            .then(() => this.router.navigateByUrl('top'));
    }
}
