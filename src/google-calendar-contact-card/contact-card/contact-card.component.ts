import { CommonModule } from '@angular/common';
import { Component, HostListener, inject } from '@angular/core';

import { CardStateService } from '../google-calendar-contact-card.directive';

@Component({
  selector: 'app-contact-card',
  templateUrl: './contact-card.component.html',
  styleUrls: ['./contact-card.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class ContactCardComponent {
  public popoverIsHovered = false;
  stateService = inject(CardStateService);

  @HostListener('mouseenter') onMouseEnter(): void {
    this.popoverIsHovered = true;
  }

  @HostListener('mouseleave') onMouseLeave(): void {
    this.popoverIsHovered = false;
  }
}
