import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {SnackbarComponent} from '../../components/snackbar/snackbar.component';
import {SnackbarServiceInterface} from './snackbar.service.interface';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService implements SnackbarServiceInterface {
  constructor(protected snackBar: MatSnackBar) {
  }

  message(type: string, message: string, duration?: number) {
    this.openSnackbar(message, type, duration);
  }

  info(message: string, duration?: number) {
    this.openSnackbar(message, 'info', duration);
  }

  success(message: string, duration?: number) {
    this.openSnackbar(message, 'success', duration);
  }

  warning(message: string, duration?: number) {
    this.openSnackbar(message, 'warning', duration);
  }

  error(message: string, duration?: number) {
    this.openSnackbar(message, 'error', duration);
  }

  dismiss() {
    this.snackBar.dismiss();
  }

  protected openSnackbar(message: string, type: string, duration: number = 2500) {
    this.snackBar.openFromComponent(SnackbarComponent, {
      duration,
      panelClass: type,
      data: {
        message,
        type
      }
    });
  }
}
