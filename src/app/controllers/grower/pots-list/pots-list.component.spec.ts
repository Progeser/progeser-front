import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PotsListComponent } from './pots-list.component';

describe('PotsListComponent', () => {
  let component: PotsListComponent;
  let fixture: ComponentFixture<PotsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PotsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PotsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
