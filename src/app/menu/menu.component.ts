import { Component, OnInit } from '@angular/core';
import { UserService } from '../core/services/user.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  public isGuest: boolean;

  constructor(private userService: UserService) {
  }

  public ngOnInit() {
    this.userService.isGuest
      .subscribe((value: boolean) => {
        this.isGuest = value;
      });
  }

  public logOut(): void {
    this.userService.logOut();
  }
}
