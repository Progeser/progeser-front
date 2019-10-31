import {Component, OnInit} from '@angular/core';
import {MenuService, UserService} from '../../services';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  appName = environment.appName;

  constructor(protected menuService: MenuService,
              protected userService: UserService) {
  }

  ngOnInit() {
  }
}
