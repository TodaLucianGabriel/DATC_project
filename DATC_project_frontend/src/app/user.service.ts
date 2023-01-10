import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _userUrl = 'http://localhost:8080/api/users';

  constructor(private httpClient: HttpClient) {}

  getUsers() {
    return this.httpClient.get<any>(this._userUrl);
  }

  deleteUser(username: string) {
    return this.httpClient.delete<any>(this._userUrl + '/' + username);
  }
}
