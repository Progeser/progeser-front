import {Component} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './requester-home.component.html',
  styleUrls: ['./requester-home.component.scss']
})
export class RequesterHomeComponent {
  tableColumns = [
    'plant',
    'dueDate',
    'name',
    'status',
    'creationDate',
    'requesterActions'
  ];
}
