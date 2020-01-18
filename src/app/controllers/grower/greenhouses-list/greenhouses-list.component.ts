import { Component, OnInit } from '@angular/core';
import {Greenhouse} from '../../../models';

@Component({
  selector: 'app-greenhouses-list',
  templateUrl: './greenhouses-list.component.html',
  styleUrls: ['./greenhouses-list.component.scss']
})
export class GreenhousesListComponent implements OnInit {
  greenhouses: Greenhouse[] = Greenhouse.exampleData;

  columns = [
    'name',
    'realSurface',
    'arableSurface',
    'numberOfBenches',
    'occupation',
    'actions'
  ];
  numberItemsPerPage = 10;

  constructor() { }

  ngOnInit() {
  }
}
