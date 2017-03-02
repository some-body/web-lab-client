import { Component, Input } from '@angular/core';
import { User } from '../user.model';
import { Router } from "@angular/router";
import { AuthService } from '../auth.service';
import { LoginRequired } from '../login-required.abstract';

@Component({
    selector: 'user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css'] 
})
export class UserComponent extends LoginRequired {
     model: User = new User();

    constructor(router: Router,
                authService: AuthService) 
    {
        super(router, authService);
    }

    onNavigationEnd() {
        super.onNavigationEnd();
        this.authService.getCurrentUser().then(user => {
            this.model = user;
        });
    }
}
