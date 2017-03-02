import { Router, NavigationEnd } from "@angular/router";
import { AuthService } from './services/auth.service';
import { OnNavigationEnd } from './on-navigation-end';


export class LoginRequired extends OnNavigationEnd {
    constructor(protected router: Router, 
                protected authService: AuthService) 
    {
        super(router);
    }

    onNavigationEnd() {
        if(!this.authService.isAuthorized) {
            this.router.navigateByUrl('login');
        }
    }
}