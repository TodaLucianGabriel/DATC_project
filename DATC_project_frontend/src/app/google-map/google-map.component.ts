import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss'],
})
export class GoogleMapComponent implements OnInit {
  apiLoaded: Observable<boolean>;
  constructor(httpClient: HttpClient) {
    this.apiLoaded = httpClient
      .jsonp(
        'https://maps.googleapis.com/maps/api/js?key=AIzaSyDZMdsVipzNX9Zl3puPjb3hRqizhPoiTsw',
        'callback'
      )
      .pipe(
        map(() => true),
        catchError(() => of(false))
      );
  }

  ngOnInit() {}
  @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow | undefined;

  display: any;
  center: google.maps.LatLngLiteral = { lat: 45.7489, lng: 21.2087 };
  zoom = 13;
  markerOptions: google.maps.MarkerOptions = { draggable: false };
  markerPositions: google.maps.LatLngLiteral[] = [];
  // event: google.maps.MapMouseEvent | undefined;

  moveMap(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.center = event.latLng.toJSON();
  }

  move(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.display = event.latLng.toJSON();
  }

  addMarker(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) {
      this.markerPositions.push(event.latLng.toJSON());
    }
  }

  removeMarker(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) {
      this.markerPositions.slice();
    }
  }

  openInfoWindow(marker: MapMarker) {
    if (this.infoWindow != null) this.infoWindow.open(marker);
  }
}
