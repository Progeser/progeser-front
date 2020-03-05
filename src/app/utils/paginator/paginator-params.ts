export class PaginatorParams {
  page: number;
  itemsPerPage: number;
  filters: object | null = null;

  constructor(page?: number, itemsPerPage?: number, filters?: object) {
    this.page = page || 1;
    this.itemsPerPage = itemsPerPage || 25;
    this.filters = filters || undefined;
  }
}
