import {Component, OnInit} from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import {Request} from '../../../models';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-greenhouse-calendar',
  templateUrl: './greenhouse-calendar.component.html',
  styleUrls: ['./greenhouse-calendar.component.scss']
})
export class GreenhouseCalendarComponent implements OnInit {
  calendarPlugins = [dayGridPlugin];
  calendarTexts;
  greenhouseRequests;

  constructor(protected translateService: TranslateService) {
    this.translateService.onLangChange.subscribe({
      next: () => {
        this.setCalendarLabels();
      }
    });

    this.setCalendarLabels();
  }

  ngOnInit() {
    // todo: get requests from api
    this.greenhouseRequests = this.transformRequestsToCalendarEvents(Request.exampleData);
  }

  transformRequestsToCalendarEvents(requests: Request[]) {
    return requests.map(request => {
      return {
        title: request.name,
        start: request.cultureStartingAt,
        end: request.dueDate,
        color: request.color,
        allDay: true
      };
    });
  }

  protected setCalendarLabels() {
    this.calendarTexts = {
      today:    this.translateService.instant('words.today'),
      month:    this.translateService.instant('words.month'),
      week:     this.translateService.instant('words.week'),
      day:      this.translateService.instant('words.day'),
      list:     this.translateService.instant('words.list')
    };
  }
}
