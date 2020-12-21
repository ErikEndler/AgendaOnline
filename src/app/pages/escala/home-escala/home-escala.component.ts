import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-home-escala',
  templateUrl: './home-escala.component.html',
  styleUrls: ['./home-escala.component.css'],
})
export class HomeEscalaComponent implements OnInit {
  @Input() hide = false;
  @Output() eventoHide = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}
  iniciar(): void {
    this.hide = !this.hide;
    this.eventoHide.emit(this.hide);
  }
}
