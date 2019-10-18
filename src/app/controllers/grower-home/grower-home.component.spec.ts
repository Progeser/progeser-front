import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrowerHomeComponent } from './grower-home.component';

describe('GrowerHomeComponent', () => {
  let component: GrowerHomeComponent;
  let fixture: ComponentFixture<GrowerHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrowerHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrowerHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
