import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/auth/token.service';
import { LoginReturn } from 'src/app/models/loginReturn';

@Component({
  selector: 'app-agendamento',
  templateUrl: './agendamento.component.html',
  styleUrls: ['./agendamento.component.css'],
})
export class AgendamentoComponent implements OnInit {
  constructor(private tokenService: TokenService, private router: Router) { }
  loginReturn: LoginReturn;
  admin = false;

  ngOnInit(): void {
    this.loginReturn = this.tokenService.decodePayloadJWT();
    if (
      this.loginReturn.role === 'ROLE_ADMIN' ||
      this.loginReturn.role === 'ROLE_FUNCIONARIO'
    ) {
      this.admin = true;
    }
  }
  meusAgendamentosCLiente(): void {
    this.router.navigate(['meusagendamentos']);

  }
  meusAgendamentos(): void {
    this.router.navigate(['agendamentoView']);
  }
  novo(): void {
    this.router.navigate(['agendamento/novo']);
  }
  agendamentoAberto() {

  }
}
