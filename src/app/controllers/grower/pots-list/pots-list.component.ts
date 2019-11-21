import { Component, OnInit } from '@angular/core';
import {Pot} from '../../../models/pot';

@Component({
  selector: 'app-pots-list',
  templateUrl: './pots-list.component.html',
  styleUrls: ['./pots-list.component.scss']
})
export class PotsListComponent implements OnInit {
  pots: Pot[] = Pot.exampleData;

  columns = [
    'name',
    'actions'
  ];
  numberItemsPerPage = 10;

  constructor() { }

  ngOnInit() {
  }

}
