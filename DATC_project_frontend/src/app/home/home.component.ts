import { Component } from '@angular/core';
import { GoogleMapComponent } from '../google-map/google-map.component';
import { BehaviorSubject } from 'rxjs';
import { UserStoreServiceService } from '../user-store-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  user = new BehaviorSubject<any>(null);

  constructor(private _userService: UserStoreServiceService) {}

  ngOnInit() {
    this._userService.user.subscribe((user) => {
      this.user.next(user);
    });
  }
}
