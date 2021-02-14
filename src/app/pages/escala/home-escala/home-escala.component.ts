import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-home-escala',
  templateUrl: './home-escala.component.html',
  styleUrls: ['./home-escala.component.css'],
})
export class HomeEscalaComponent implements OnInit {
  @Input() visible = true;
  @Output() eventoHide = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}
  iniciar(): void {
    this.visible = !this.visible;
    this.eventoHide.emit(this.visible);
  }
}
