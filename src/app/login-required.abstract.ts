import { Router, NavigationEnd } from "@angular/router";
import { AuthService } from './auth.service';
import { OnNavigationEnd } from './on-navigation-end';


export class LoginRequired extends OnNavigationEnd {
    constructor(private router: Router, 
                private authService: AuthService) 
    {
        super(router);
    }

    onNavigationEnd() {
        if(!this.authService.isAuthorized) {
            this.router.navigateByUrl('login');
        }
    }
}