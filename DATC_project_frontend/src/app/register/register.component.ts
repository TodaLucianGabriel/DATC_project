import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registerUserData: any = {};

  constructor(private _auth: AuthService, private _router: Router) {}

  ngOnInit(): void {}

  registerUser() {
    this._auth.registerUser(this.registerUserData).subscribe(
      (res) => {
        console.log(res);
        localStorage.setItem('token', res.token);
        this._router.navigate(['/home']);
      },
      (err) => console.log(err)
    );
  }
}
