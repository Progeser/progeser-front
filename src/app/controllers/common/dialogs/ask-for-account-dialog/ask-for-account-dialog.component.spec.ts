import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AskForAccountDialogComponent } from './ask-for-account-dialog.component';

describe('AskForAccountDialogComponent', () => {
  let component: AskForAccountDialogComponent;
  let fixture: ComponentFixture<AskForAccountDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AskForAccountDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AskForAccountDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
