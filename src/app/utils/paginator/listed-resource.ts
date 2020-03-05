import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {BehaviorSubject, Observable} from 'rxjs';

export class ListedResource<T> implements DataSource<T> {
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

  set items(items: T[]) {
    this.cachedItems = items;

    this.updateItems();
  }

  connect(collectionViewer: CollectionViewer): Observable<T[] | ReadonlyArray<T>> {
    return this.itemsSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.itemsSubject.complete();
  }

  protected recomputeVariables() {
    this.totalPages = this.totalItems / this.itemsPerPage;
  }

  get items(): T[] {
    return this.cachedItems;
  }

  protected updateItems() {
    this.itemsSubject.next(this.cachedItems);
  }
}
