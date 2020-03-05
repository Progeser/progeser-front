import {PaginatorParams} from './paginator-params';
import {ListedResource} from './listed-resource';

export class PaginatorParamsBuilder {
  page;
  itemsPerPage;
  filters: object;

  static createNextPageParamsFromListedResource(listedResource: ListedResource<any>, filters?: object): PaginatorParams {
    const paginatorParamsBuilder = new PaginatorParamsBuilder();

    paginatorParamsBuilder.page = listedResource.currentPage + 1;
    paginatorParamsBuilder.itemsPerPage = listedResource.itemsPerPage;
    paginatorParamsBuilder.filters = filters;

    return paginatorParamsBuilder.getPaginatorParams();
  }

  getPaginatorParams(): PaginatorParams {
    return new PaginatorParams(this.page, this.itemsPerPage, this.filters);
  }
}
