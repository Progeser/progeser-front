import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {BehaviorSubject, Observable} from 'rxjs';

export class PaginatedResource<T> implements DataSource<T> {
  currentPage: number;
  itemsPerPage: number;
  totalPages: number;
  totalItems: number;

  protected cachedItems: T[];
  protected itemsSubject = new BehaviorSubject<T[]>([]);

  constructor(currentPage: number, itemsPerPage: number, totalPages: number, totalItems: number, items: T[]) {
    this.currentPage = currentPage;
    this.itemsPerPage = itemsPerPage;
    this.totalPages = totalPages;
    this.totalItems = totalItems;
    this.items = items;
  }

  connect(collectionViewer: CollectionViewer): Observable<T[] | ReadonlyArray<T>> {
    return this.itemsSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.itemsSubject.complete();
  }

  removeItemByIndex(index: number) {
    this.cachedItems.splice(index, 1);
    this.totalItems -= 1;

    this.recomputeVariables();
    this.updateItems();
  }

  get items(): T[] {
    return this.cachedItems;
  }

  set items(items: T[]) {
    this.cachedItems = items;
    this.updateItems();
  }

  protected recomputeVariables() {
    this.totalPages = this.totalItems / this.itemsPerPage;
  }

  protected updateItems() {
    this.itemsSubject.next(this.cachedItems);
  }
}
