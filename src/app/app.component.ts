import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'pricing-app';
  isMobile: boolean = window.innerWidth <= 900;

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.isMobile = window.innerWidth <= 900;
  }

  ngOnInit() {
    this.isMobile = window.innerWidth <= 900;
  }
}
