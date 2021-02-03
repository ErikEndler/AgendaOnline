import { NotificacaoRxService } from './../../../components/notificacao/notificacao-rx.service';
import { RatingService } from './../../../shared/rating/rating.service';
import { AuthService } from './../../../auth/auth.service';
import { LoginReturn } from './../../../models/loginReturn';
import { TokenService } from './../../../auth/token.service';
import { Component, OnInit } from '@angular/core';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { NotificacaoService } from 'src/app/shared/notificacao/notificacao.service';
import { ModalLoginService } from 'src/app/shared/modal-login/modal-login.service';
import { Router } from '@angular/router';
import { timer } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  loginReturn: LoginReturn;
  logado = false;
  time: any;
  isRunning: any;
  constructor(
    private notificacaoRxService: NotificacaoRxService,
    private notificacao: NotificacaoService,
    private tokenService: TokenService,
    private authService: AuthService,
    private modalLoginService: ModalLoginService,
    private router: Router,
    private ratingService: RatingService
  ) {}
  segundos: number = 0;
  minutos: number = 0;
  interval;
  hrFinal;
  // https://medium.com/@josevieiraneto/push-notifications-com-server-sent-events-spring-boot-c2b7ee6febe9
  ngOnInit(): void {
    this.authService.eventoLogar.subscribe(() => (this.logado = true));
    this.authService.eventoDeslogar.subscribe(() => (this.logado = false));
    this.metodo();
    timer(0, 1000).subscribe((ellapsedCycles) => {
      if (this.isRunning) {
        this.time--;
      }
    });
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
  agendar(): void {
    this.router.navigate(['agendamento/novo']);
  }
  pauseTimer(): void {
    clearInterval(this.interval);
  }
  startInfinito(): void {
    this.interval = setInterval(() => {
      this.segundos++;
      this.hrFinal = moment(0, 'HH:mm:ss')
        .add(this.segundos, 's')
        .format('HH:mm:ss');
    }, 1000);
  }
  clearTime(): void {
    this.segundos = 0;
  }
  receberNota(resposta): void {
    console.log('pai nota recebida : ', resposta);
  }
  conectar() {
    this.notificacaoRxService.connectClicked(this.loginReturn.cpf);
  }
  desconectar() {
    this.notificacaoRxService.disconnectClicked();
  }
  start() {
    this.notificacaoRxService.startClicked();
  }
  stop() {
    this.notificacaoRxService.stopClicked();
  }
}
