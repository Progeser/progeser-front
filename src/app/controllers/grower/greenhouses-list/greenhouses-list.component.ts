import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Greenhouse} from '../../../models';
import {PaginatedResource} from '../../../utils/paginator/paginated-resource';
import {PaginatorComponent} from '../../../components';
import {GreenhouseService} from '../../../services/http';
import {ConfirmationDialogService} from '../../../services/confirmation-dialog/confirmation-dialog.service';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-greenhouses-list',
  templateUrl: './greenhouses-list.component.html',
  styleUrls: ['./greenhouses-list.component.scss']
})
export class GreenhousesListComponent implements AfterViewInit {
  columns = [
    'name',
    'realSurface',
    'occupancy',
    // todo: add back this columns when available in API
    // 'arableSurface',
    // 'numberOfBenches',
    'actions'
  ];
  greenhouses: PaginatedResource<Greenhouse> = null;

  @ViewChild('greenhousesPaginator', {static: true})
  greenhousesPaginator: PaginatorComponent<Greenhouse>;

  constructor(protected httpGreenhouseService: GreenhouseService,
              protected confirmationService: ConfirmationDialogService) { }

  ngAfterViewInit() {
    this.greenhousesPaginator.pageChange.subscribe({
      next: greenhouses => this.greenhouses = greenhouses
    });
  }

  deleteGreenhouse(greenhouseId: number, greenhouseIndex: number) {
    this.confirmationService.confirm(undefined, 'confirmations.greenhouse.delete').pipe(
      switchMap(() => this.httpGreenhouseService.delete(greenhouseId))
    ).subscribe({
      next: () => this.greenhouses.removeItemByIndex(greenhouseIndex)
    });
  }
}
