import { AuthService } from './../../../auth/auth.service';
import { LoginReturn } from './../../../models/loginReturn';
import { TokenService } from './../../../auth/token.service';
import { Component, OnInit } from '@angular/core';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { NotificacaoService } from 'src/app/shared/notificacao/notificacao.service';
import { ModalLoginService } from 'src/app/shared/modal-login/modal-login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  loginReturn: LoginReturn;
  logado = false;
  constructor(
    private notificacao: NotificacaoService,
    private tokenService: TokenService,
    private authService: AuthService,
    private modalLoginService: ModalLoginService,
    private router: Router
  ) {}
  // https://medium.com/@josevieiraneto/push-notifications-com-server-sent-events-spring-boot-c2b7ee6febe9
  ngOnInit(): void {
    this.authService.eventoLogar.subscribe(() => this.metodo());
    this.metodo();
  }
  metodo(): void {
    this.loginReturn = this.tokenService.decodePayloadJWT();
    if (this.loginReturn) {
      this.logado = true;
    }
  }
  testando(): void {
    this.notificacao.criar(NotificationType.Warn, 'titulo', 'mensagem');
  }
  logar(): void {
    this.modalLoginService.open();
  }
  perfil(): void {
    this.router.navigate(['perfil/', this.loginReturn.id]);
  }
}
