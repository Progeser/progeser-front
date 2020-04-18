import {Component, OnInit} from '@angular/core';
import {MenuService, UserService} from '../../services';
import {User} from '../../models/user';
import {PermissionService} from '../../services/permission/permission.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  constructor(protected menuService: MenuService,
              protected userService: UserService,
              protected permissionService: PermissionService) {
  }
}
