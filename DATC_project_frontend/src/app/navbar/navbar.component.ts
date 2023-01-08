import { Component } from '@angular/core';
import { UserStoreServiceService } from '../user-store-service.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  user = new BehaviorSubject<any>(null);

  constructor(private _userService: UserStoreServiceService) {}

  ngOnInit() {
    this._userService.user.subscribe((user) => {
      this.user.next(user);
    });
  }

  logout(){
    this._userService.setUser(null);
  }
}
