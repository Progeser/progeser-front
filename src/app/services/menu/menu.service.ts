import {Injectable, Output} from '@angular/core';
import {environment} from '../../../environments/environment';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  @Output()
  protected isOpen = new BehaviorSubject<boolean>(environment.menuOpenAtStart);
  public isOpen$ = this.isOpen.asObservable();

  toggle() {
    this.isOpen.next(!this.isOpen.getValue());
  }
}
