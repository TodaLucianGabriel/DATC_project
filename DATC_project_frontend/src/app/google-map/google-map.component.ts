import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { FormControl } from '@angular/forms';
import { LocalizedString } from '@angular/compiler';
import { LocationService } from '../location.service';
import { UserStoreServiceService } from '../user-store-service.service';

export interface MarkerItem {
  id: number;
  position: google.maps.LatLngLiteral;
  description: string | null;
}

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss'],
})
export class GoogleMapComponent implements OnInit {
  apiLoaded: Observable<boolean>;
  selectedMarker: MarkerItem | null = null;
  descriptionInput = new FormControl('');
  isEditMode = false;
  selectedCoordinates: any = null;
  reload = new BehaviorSubject(null);
  user = new BehaviorSubject<any>(null);

  constructor(
    httpClient: HttpClient,
    private locationService: LocationService,
    private userStoreService: UserStoreServiceService
  ) {
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

  ngOnInit() {
    this.reload
      .pipe(switchMap(() => this.locationService.getLocation()))
      .subscribe((data) => {
        console.log(data);
        this.markerPositions = data.map((item: any) => {
          return {
            position: JSON.parse(item.position),
            id: item.id,
            description: item.description,
          };
        });
      });
    this.userStoreService.user.subscribe((user) => {
      this.user.next(user);
    });
  }

  @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow | undefined;

  display: any;
  center: google.maps.LatLngLiteral = { lat: 45.7489, lng: 21.2087 };
  zoom = 13;
  markerOptions: google.maps.MarkerOptions = { draggable: false };
  markerPositions: MarkerItem[] = [];

  // event: google.maps.MapMouseEvent | undefined;

  moveMap(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.center = event.latLng.toJSON();
  }

  move(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.display = event.latLng.toJSON();
  }

  addMarker(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) {
      this.isEditMode = true;
      this.selectedCoordinates = event.latLng.toJSON();
      const id = this.markerPositions.length
        ? this.markerPositions[this.markerPositions.length - 1].id + 1
        : 1;
    }
  }

  removeMarker(id: number) {
    if (id != null) {
      const index = this.markerPositions.findIndex((item) => item.id === id);
      this.markerPositions.splice(index, 1);
      this.infoWindow?.close();
      this.locationService.deleteLocation(id).subscribe(
        () => {
          this.reload.next(null);
        },
        (err) => {
          console.log(err);
          this.reload.next(null);
        }
      );
    }
  }

  openInfoWindow(marker: MapMarker, markerItem: MarkerItem) {
    if (this.infoWindow != null) this.infoWindow.open(marker);
    this.selectedMarker = markerItem;
  }

  submit() {
    const id = this.markerPositions.length
      ? this.markerPositions[this.markerPositions.length - 1].id + 1
      : 1;
    const data = {
      id,
      position: this.selectedCoordinates,
      description: this.descriptionInput.value,
    };
    this.locationService.sendLocation(data).subscribe(() => {
      this.reload.next(null);
      this.isEditMode = false;
    });
  }
}
