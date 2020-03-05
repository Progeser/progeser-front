import { Injectable } from '@angular/core';
import {MatDialog} from '@angular/material';
import {ConfirmationDialogComponent} from '../../controllers/common/dialogs/confirmation-dialog/confirmation-dialog.component';
import {filter} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfirmationDialogService {

  constructor(protected dialog: MatDialog) { }

  confirm(confirmationTitle = 'phrases.confirm', confirmationMessage = 'phrases.areYouSure'): Observable<boolean> {
    const openedDialog = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: confirmationTitle,
        message: confirmationMessage
      }
    });

    return openedDialog.afterClosed().pipe(
      filter(dialogResult => true === dialogResult)
    );
  }
}
