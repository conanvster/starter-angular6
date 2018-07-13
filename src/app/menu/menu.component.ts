import { Component, OnInit } from '@angular/core';
import { UserService } from '../core/services/user.service';
import { User } from '../core/models/user.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  public isGuest: boolean;
  public user: User;

  constructor(private userService: UserService) {
  }

  public ngOnInit() {
    this.userService.user
      .subscribe((user: User) => {
        this.user = user;
        this.isGuest = Boolean(user);
      });
  }
}
