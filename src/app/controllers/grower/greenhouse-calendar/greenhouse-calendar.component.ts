import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import {Request} from '../../../models';

@Component({
  selector: 'app-greenhouse-calendar',
  templateUrl: './greenhouse-calendar.component.html',
  styleUrls: ['./greenhouse-calendar.component.scss']
})
export class GreenhouseCalendarComponent implements OnInit {
  calendarPlugins = [dayGridPlugin];
  calendarTexts = {
    today:    'Aujourd\'hui',
    month:    'Mois',
    week:     'Semaine',
    day:      'Jour',
    list:     'Liste'
  };
  greenhouseRequests;

  constructor(@Inject(LOCALE_ID) public locale: string) {
  }

  ngOnInit() {
    // todo: get requests from api
    this.greenhouseRequests = this.transformRequestsToCalendarEvents(Request.exampleData);
  }

  transformRequestsToCalendarEvents(requests: Request[]) {
    return requests.map(request => {
      return {
        title: request.name,
        start: request.cultureStartingDate,
        end: request.dueDate,
        color: request.color,
        allDay: true
      };
    });
  }
}
