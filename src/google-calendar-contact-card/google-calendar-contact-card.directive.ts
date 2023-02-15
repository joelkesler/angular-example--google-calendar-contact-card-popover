import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import {
  Directive,
  ElementRef,
  HostListener,
  inject,
  Injectable,
} from '@angular/core';
import { GoogleCalendarContactCardComponent } from './component/google-calendar-contact-card.component';
import { cardPositions } from './positions';

@Directive({
  selector: '[contact-card]',
  standalone: true,
})
export class GoogleCalendarContactCardDirective {
  private overlay = inject(Overlay);
  private stateService = inject(GoogleCalendarContactCardStateService);

  contactCardComponent = new ComponentPortal(
    GoogleCalendarContactCardComponent
  );
  currentOverlayComponent: GoogleCalendarContactCardComponent;
  contactCardOverlayRef: OverlayRef;

  triggerIsHovered = false;

  mouseX: number;
  mouseY: number;

  openTimer; // the id for our setTimeout used to open the popover
  closeTimer; // the id for our setTimeout used to open the popover

  @HostListener('mousemove', ['$event']) onMouseMove(event: MouseEvent): void {
    this.mouseX = event.pageX;
    this.mouseY = event.pageY;
  }

  @HostListener('mouseenter') onMouseEnter(): void {
    this.triggerIsHovered = true;
    if (!this.currentOverlayComponent) this.startOpenTimer();
  }

  @HostListener('mouseleave') onMouseLeave(): void {
    this.triggerIsHovered = false;
    clearTimeout(this.openTimer);
    this.startCloseTimer();
  }

  @HostListener('window:keydown.escape') onEscapeKey() {
    this.close();
  }

  startOpenTimer() {
    this.openTimer = setTimeout(() => {
      this.open();
    }, 500);
  }

  startCloseTimer() {
    clearInterval(this.closeTimer); // close any preexisting timers first
    this.closeTimer = setInterval(() => {
      this.checkIfCanClose();
    }, 1000);
  }

  checkIfCanClose() {
    console.log('checkIfCanClose');
    if (
      !this.triggerIsHovered &&
      !this.currentOverlayComponent?.popoverIsHovered
    ) {
      this.close();
    }
  }

  open() {
    if (this.stateService.currentPopover) {
      this.stateService.currentPopover?.close();
    }

    // Thanks to https://github.com/scttcper/ngx-rightclick/blob/master/src/lib/context-menu.service.ts
    const tempElement = new ElementRef({
      getBoundingClientRect: () => new DOMRect(this.mouseX, this.mouseY, 0, 0),
    });
    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(tempElement)
      .withFlexibleDimensions(false)
      .withPositions(cardPositions);

    const config = new OverlayConfig({
      positionStrategy: positionStrategy,
    });

    this.contactCardOverlayRef = this.overlay.create(config);
    this.currentOverlayComponent = this.contactCardOverlayRef.attach(
      this.contactCardComponent
    ).instance;
    this.stateService.currentPopover = this;
  }

  close() {
    clearInterval(this.closeTimer);
    if (!this.currentOverlayComponent) return;
    this.contactCardOverlayRef.detach();
    this.currentOverlayComponent = null;
  }
}

//
//
//
//

@Injectable({
  providedIn: 'root',
})
export class GoogleCalendarContactCardStateService {
  public currentPopover: GoogleCalendarContactCardDirective;
}
