import {Component, OnInit} from '@angular/core';
import {Request} from '../../../models';

@Component({
  selector: 'app-home',
  templateUrl: './grower-home.component.html',
  styleUrls: ['./grower-home.component.scss']
})
export class GrowerHomeComponent implements OnInit {
  tableColumns = [
    'plant',
    'dueDate',
    'name',
    'status',
    'creationDate',
    'growerActions'
  ];

  requests = Request.exampleData;

  constructor() {
  }

  ngOnInit() {
  }

}
