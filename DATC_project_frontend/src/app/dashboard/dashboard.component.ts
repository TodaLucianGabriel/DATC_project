import { OnInit, Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserService } from '../user.service';
import { HttpClient } from '@angular/common/http';
import { catchError, switchMap } from 'rxjs/operators';

export interface UserItem {
  username: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  reload = new BehaviorSubject(null);
  //users = new BehaviorSubject<any>(null);
  users: UserItem[] = [];

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['Username', 'Email', 'Password'];

  constructor(
    private httpClient: HttpClient,
    private userService: UserService
  ) {
    // this.dataSource = new DashboardDataSource();
  }

  ngOnInit() {
    this.reload
      .pipe(switchMap(() => this.userService.getUsers()))
      .subscribe((data) => {
        console.log(data);
        this.users = data;
      });
  }

  removeUser(username: string) {
    if (username != null) {
      this.userService.deleteUser(username).subscribe(
        () => {
          this.reload.next(null);
        },
        (err: any) => {
          console.log(err);
          this.reload.next(null);
        }
      );
    }
  }
}
