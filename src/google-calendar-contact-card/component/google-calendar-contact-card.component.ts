import { CommonModule } from '@angular/common';
import { Component, HostListener, inject } from '@angular/core';
import { GoogleCalendarContactCardStateService } from '../google-calendar-contact-card.directive';

@Component({
  selector: 'app-google-calendar-contact-card',
  templateUrl: './google-calendar-contact-card.component.html',
  styleUrls: ['./google-calendar-contact-card.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class GoogleCalendarContactCardComponent {
  public popoverIsHovered = false;
  stateService = inject(GoogleCalendarContactCardStateService);

  @HostListener('mouseenter') onMouseEnter(): void {
    this.popoverIsHovered = true;
  }

  @HostListener('mouseleave') onMouseLeave(): void {
    this.popoverIsHovered = false;
  }
}
