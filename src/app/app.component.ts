import { Component } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(protected translateService: TranslateService) {
    this.setTranslateConfiguration();
  }

  protected setTranslateConfiguration() {
    this.translateService.setDefaultLang('fr-FR');
    this.translateService.use('fr-FR');
  }
}
