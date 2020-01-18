import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Greenhouse} from '../../../models';
import {PaginatedResource} from '../../../models/paginated-resource';
import {TablePaginatorComponent} from '../../../components';
import {GreenhouseService} from '../../../services/http';

@Component({
  selector: 'app-greenhouses-list',
  templateUrl: './greenhouses-list.component.html',
  styleUrls: ['./greenhouses-list.component.scss']
})
export class GreenhousesListComponent implements AfterViewInit {
  columns = [
    'name',
    'realSurface',
    // todo: add back this columns when available in API
    // 'arableSurface',
    // 'numberOfBenches',
    // 'occupation',
    'actions'
  ];
  greenhouses: PaginatedResource<Greenhouse> = null;

  @ViewChild('greenhousesPaginator', {static: true})
  greenhousesPaginator: TablePaginatorComponent<Greenhouse>;

  constructor(protected httpGreenhouseService: GreenhouseService) { }

  ngAfterViewInit() {
    this.greenhousesPaginator.pageChange.subscribe({
      next: greenhouses => this.greenhouses = greenhouses
    });
  }

  deleteGreenhouse(greenhouseId: number, greenhouseIndex: number) {
    this.httpGreenhouseService.delete(greenhouseId).subscribe({
      next: () => this.greenhouses.removeItemByIndex(greenhouseIndex)
    });
  }
}
