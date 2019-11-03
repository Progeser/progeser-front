import {Component, Inject} from '@angular/core';
import {MAT_SNACK_BAR_DATA} from '@angular/material';
import {SnackbarData} from './snackbar-data';
import {SnackbarServiceInterface} from '../../services/snackbar/snackbar.service.interface';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent {
  icons = {
    info: 'info',
    success: 'done',
    warning: 'warning',
    error: 'error'
  };

  constructor(@Inject(MAT_SNACK_BAR_DATA) public snackbarData: SnackbarData,
              @Inject('SnackbarServiceInterface') public snackbarService: SnackbarServiceInterface) {
  }

  getIcon(): string {
    return this.icons[this.snackbarData.type];
  }
}
