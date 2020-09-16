import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
})
export class UsuarioComponent implements OnInit {
  maskFone = '000.000.000-00';
  maskCpf = '000.000.000-00';

  constructor() {}

  ngOnInit(): void {}
}
