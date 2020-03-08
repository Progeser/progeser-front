import {Component} from '@angular/core';
import {Request} from '../../../models';
import {UserService} from '../../../services';
import {User} from '../../../models/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  requestStatus = Request.STATUS;

  tableColumns = [
    'plant',
    'name',
    'status',
    'creationDate',
    'dueDate',
    'actions'
  ];

  constructor(protected userService: UserService) {
  }

  // todo: remove duplicate
  userIsGrower(): boolean {
    return this.userService.hasRole(User.roles[1]);
  }
}
