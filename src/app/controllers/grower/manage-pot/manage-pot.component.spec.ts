import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePotComponent } from './manage-pot.component';

describe('ManagePotComponent', () => {
  let component: ManagePotComponent;
  let fixture: ComponentFixture<ManagePotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagePotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagePotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
