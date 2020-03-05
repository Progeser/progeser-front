import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {Pot} from '../../../models/pot';
import {PotService} from '../../../services/http/pot/pot.service';
import {PaginatedResource} from '../../../utils/paginator/paginated-resource';
import {PaginatorComponent} from '../../../components';
import {ConfirmationDialogService} from '../../../services/confirmation-dialog/confirmation-dialog.service';
import {switchMap} from 'rxjs/operators';

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
  potsPaginator: PaginatorComponent<Pot>;

  constructor(protected httpPotService: PotService,
              protected confirmationService: ConfirmationDialogService) { }

  ngAfterViewInit() {
    this.potsPaginator.pageChange.subscribe({
      next: pots => this.pots = pots
    });
  }

  deletePot(potId: number, potIndex: number) {
    this.confirmationService.confirm(undefined, 'confirmations.pot.delete').pipe(
      switchMap(() => this.httpPotService.delete(potId))
    ).subscribe({
      next: () => this.pots.removeItemByIndex(potIndex)
    });
  }

}
