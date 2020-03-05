import {Component} from '@angular/core';
import {Request} from '../../../models';

@Component({
  selector: 'app-home',
  templateUrl: './grower-home.component.html',
  styleUrls: ['./grower-home.component.scss']
})
export class GrowerHomeComponent {
  requestStatus = Request.STATUS;

  tableColumns = [
    'plant',
    'dueDate',
    'name',
    'status',
    'creationDate',
    'growerActions'
  ];
}
