import { Component } from '@angular/core';

@Component({
  selector: 'app-headers',
  templateUrl: './headers.component.html',
  styleUrl: './headers.component.scss',
})
export class HeadersComponent {
  isW: boolean = false;
  showMenu() {
    this.isW = !this.isW;
  }
}
