import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private _locationUrl = 'http://localhost:8080/api/location';

  constructor(private httpClient: HttpClient) {}

  sendLocation(data: any) {
    return this.httpClient.post<any>(this._locationUrl, data);
  }

  getLocation() {
    return this.httpClient.get<any>(this._locationUrl);
  }

  deleteLocation(id: number) {
    return this.httpClient.delete<any>(this._locationUrl + '/' + id);
  }
}
