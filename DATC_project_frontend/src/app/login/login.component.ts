import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { UserStoreServiceService } from '../user-store-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginUserData: any = {};

  constructor(
    private _auth: AuthService,
    private _router: Router,
    private _userService: UserStoreServiceService
  ) {}

  ngOnInit(): void {}

  loginUser() {
    this._auth.loginUser(this.loginUserData).subscribe(
      (res) => {
        console.log(res);
        localStorage.setItem('token', res.token);
        this._userService.setUser(res.user);
        this._router.navigate(['/home']);
      },
      (err) => console.log(err)
    );
  }
}
