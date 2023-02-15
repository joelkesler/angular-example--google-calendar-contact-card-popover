import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { GoogleCalendarContactCardDirective } from '../google-calendar-contact-card/google-calendar-contact-card.directive';

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [CommonModule, GoogleCalendarContactCardDirective],
})
export class AppComponent {}
