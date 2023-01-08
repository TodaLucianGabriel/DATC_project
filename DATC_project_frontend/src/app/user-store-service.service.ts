import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserStoreServiceService {
  user = new BehaviorSubject(null);
  setUser(user: any) {
    this.user.next(user);
  }

  constructor() {}
}
