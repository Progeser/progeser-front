import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../services';
import {User} from '../../../models/user';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home-router',
  templateUrl: './home-router.component.html'
})
export class HomeRouterComponent implements OnInit {
  constructor(protected userService: UserService,
              protected router: Router) {
  }

  ngOnInit() {
    if (this.userService.hasRole(User.roles[0])) {
      this.router.navigate(['/requester-home']);
    } else if (this.userService.hasRole(User.roles[1])) {
      this.router.navigate(['/grower-home']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
