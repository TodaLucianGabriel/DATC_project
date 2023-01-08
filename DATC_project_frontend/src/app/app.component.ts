import { Component, OnInit } from '@angular/core';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { BehaviorSubject } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { UserStoreServiceService } from './user-store-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
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
