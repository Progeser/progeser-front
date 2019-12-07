import {Component, OnInit} from '@angular/core';
import {MenuService, UserService} from '../../services';
import {User} from '../../models/user';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  isOpen: boolean;
  roles = User.roles;

  constructor(protected menuService: MenuService,
              protected userService: UserService) {
  }

  ngOnInit() {
    this.menuService.isOpen$.subscribe({
      next: (isOpen) => this.isOpen = isOpen
    });
  }
}
