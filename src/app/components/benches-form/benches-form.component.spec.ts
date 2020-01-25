import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BenchesFormComponent } from './benches-form.component';

describe('BenchesFormComponent', () => {
  let component: BenchesFormComponent;
  let fixture: ComponentFixture<BenchesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BenchesFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BenchesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
