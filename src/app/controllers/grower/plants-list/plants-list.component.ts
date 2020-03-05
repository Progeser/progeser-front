import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {Plant} from '../../../models';
import {PaginatedResource} from '../../../utils/paginator/paginated-resource';
import {PaginatorComponent} from '../../../components';
import {PlantService} from '../../../services/http/plant/plant.service';

@Component({
  selector: 'app-plants-list',
  templateUrl: './plants-list.component.html',
  styleUrls: ['./plants-list.component.scss']
})
export class PlantsListComponent implements AfterViewInit {
  columns = [
    'name',
    'actions'
  ];

  plants: PaginatedResource<Plant> = null;

  @ViewChild('plantsPaginator', {static: true})
  plantsPaginator: PaginatorComponent<Plant>;

  constructor(protected httpPlantService: PlantService) {
  }

  ngAfterViewInit() {
    this.plantsPaginator.pageChange.subscribe({
      next: plants => this.plants = plants
    });
  }

  deletePlant(plantId: number, plantIndex: number) {
    this.httpPlantService.delete(plantId).subscribe({
      next: () => this.plants.removeItemByIndex(plantIndex)
    });
  }
}
