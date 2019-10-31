import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services';

@Component({
  selector: 'app-logged-user',
  templateUrl: './logged-user.component.html',
  styleUrls: ['./logged-user.component.scss']
})
export class LoggedUserComponent implements OnInit {

  constructor(protected userService: UserService) { }

  ngOnInit() {
  }

}
