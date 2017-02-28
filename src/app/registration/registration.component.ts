import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { User } from '../user.model';
import { Router } from "@angular/router";

@Component({
    selector: 'registration',
    templateUrl: './registration.component.html'
})
export class RegistrationComponent {
    model: User = new User();

    constructor(private router: Router,
                private authService: AuthService) 
    {
    }

    onSubmit() {
        this.authService.registrate(this.model)
            .then(() => this.router.navigateByUrl('top'))
            .catch(() => {
                console.log('Неуспешно');
            });
    }
}
