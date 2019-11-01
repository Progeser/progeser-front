import {Component, OnInit} from '@angular/core';
import {Plant} from '../../../models';

@Component({
  selector: 'app-plants-list',
  templateUrl: './plants-list.component.html',
  styleUrls: ['./plants-list.component.scss']
})
export class PlantsListComponent implements OnInit {
  plants: Plant[] = Plant.exampleData;

  columns = [
    'name',
    'actions'
  ];
  numberItemsPerPage = 10;

  constructor() {
  }

  ngOnInit() {
  }
}
