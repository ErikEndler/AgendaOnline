import { UsuarioService } from './../../usuario/usuario.service';
import { LoginReturn } from './../../../models/loginReturn';
import { TokenService } from 'src/app/auth/token.service';
import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-agendamento-home',
  templateUrl: './agendamento-home.component.html',
  styleUrls: ['./agendamento-home.component.css']
})
export class AgendamentoHomeComponent implements OnInit {
  admin: boolean;
  loginReturn: LoginReturn;

  constructor(
    private tokenService: TokenService,
  ) { }

  ngOnInit(): void {
    this.loginReturn = this.tokenService.decodePayloadJWT();
    if (this.loginReturn.role === 'ROLE_ADMIN' || this.loginReturn.role === 'ROLE_FUNCIONARIO') {
      this.admin = true;
    }
  }

}
