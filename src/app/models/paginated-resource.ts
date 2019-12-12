export class PaginatedResource<T> {
  currentPage: number;
  itemsPerPage: number;
  totalPages: number;
  totalItems: number;
  items: T[];

  constructor(currentPage: number, itemsPerPage: number, totalPages: number, totalItems: number, items: T[]) {
    this.currentPage = currentPage;
    this.itemsPerPage = itemsPerPage;
    this.totalPages = totalPages;
    this.totalItems = totalItems;
    this.items = items;
  }
}
