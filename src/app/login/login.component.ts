import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { LoginModel } from './login.model';
import { Router } from "@angular/router";

@Component({
    selector: 'login',
    templateUrl: './login.component.html'
})
export class LoginComponent {
    model: LoginModel = new LoginModel();

    constructor(private router: Router,
                private authService: AuthService) 
    {
    }

    onSubmit() {
        this.authService.login(this.model.login, this.model.password)
            .then(() => this.router.navigateByUrl('top'))
            .catch(() => {
                console.log('Неуспешно');
                this.model = new LoginModel();
            });
    }
}
