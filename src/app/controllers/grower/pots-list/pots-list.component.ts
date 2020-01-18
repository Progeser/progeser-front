import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {Pot} from '../../../models/pot';
import {PotService} from '../../../services/http/pot/pot.service';
import {PaginatedResource} from '../../../models/paginated-resource';
import {TablePaginatorComponent} from '../../../components';

@Component({
  selector: 'app-pots-list',
  templateUrl: './pots-list.component.html',
  styleUrls: ['./pots-list.component.scss']
})
export class PotsListComponent implements AfterViewInit {
  columns = [
    'name',
    'actions'
  ];
  pots: PaginatedResource<Pot> = null;

  @ViewChild('potsPaginator', {static: true})
  potsPaginator: TablePaginatorComponent<Pot>;

  constructor(protected httpPotService: PotService) { }

  ngAfterViewInit() {
    this.potsPaginator.pageChange.subscribe({
      next: pots => this.pots = pots
    });
  }

  deletePot(potId: number, potIndex: number) {
    this.httpPotService.delete(potId).subscribe({
      next: () => this.pots.removeItemByIndex(potIndex)
    });
  }

}
