import {Component, OnInit} from '@angular/core';
import {Request} from '../../models';

@Component({
  selector: 'app-home',
  templateUrl: './requester-home.component.html',
  styleUrls: ['./requester-home.component.scss']
})
export class RequesterHomeComponent implements OnInit {
  tableColumns = [
    'plant',
    'dueDate',
    'name',
    'status',
    'creationDate',
    'requesterActions'
  ];

  requests = Request.exampleData;

  constructor() {
  }

  ngOnInit() {
  }

}
