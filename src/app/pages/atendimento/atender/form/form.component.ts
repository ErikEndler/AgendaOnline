import { UsuarioService } from './../../../usuario/usuario.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Agendamento } from 'src/app/models/agendamento';
import * as moment from 'moment';
import { Atendimento } from 'src/app/models/atendimento';
import { TokenService } from 'src/app/auth/token.service';
import { LoginReturn } from 'src/app/models/loginReturn';
import { ModalConfirmacaoService } from 'src/app/shared/modal-confirmacao/modal-confirmacao.service';
import { ErroService } from 'src/app/shared/erro/erro.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  loginReturn: LoginReturn;
  atendimento: Atendimento = new Atendimento();
  agendamento: Agendamento;
  data: string;
  horaInicial: string;
  horaFinal: string;
  segundos = 0;
  time;
  interval;
  btn1 = 'Iniciar Atendimento';
  btn1Disabled = false;
  inicioAtendimento;
  fimAtendimento;

  constructor(
    private route: ActivatedRoute,
    private tokenService: TokenService,
    private usuarioService: UsuarioService,
    private erroService: ErroService,
    private modalConfirm: ModalConfirmacaoService
  ) {}

  ngOnInit(): void {
    this.loginReturn = this.tokenService.decodePayloadJWT();
    this.agendamento = this.route.snapshot.data.agendamento;
    this.atendimento.agendamento = this.agendamento;
    this.usuarioService.loadByID(this.loginReturn.id).subscribe((result) => {
      this.atendimento.funcionario = result;
    });
    this.loadAgendamento();
  }
  loadAgendamento(): void {
    this.data = this.agendamento.horarioInicio.slice(0, 10);
    console.log(this.data);
    console.log(this.agendamento);
    this.horaFinal = this.agendamento.horarioFim.slice(-5);
    this.horaInicial = this.agendamento.horarioInicio.slice(-5);
  }
  pauseTimer(): void {
    this.btn1Disabled = false;

    clearInterval(this.interval);
  }
  startInfinito(): void {
    this.inicioAtendimento = moment().format('HH:mm');
    this.btn1 = 'continuar';
    this.btn1Disabled = true;
    this.interval = setInterval(() => {
      this.segundos++;
      this.time = moment(0, 'HH:mm:ss')
        .add(this.segundos, 's')
        .format('HH:mm:ss');
      this.fimAtendimento = moment().format('HH:mm');
    }, 1000);
  }
  clearTime(): void {
    this.segundos = 0;
    this.btn1 = 'Iniciar Atendimento';
    this.btn1Disabled = false;
  }
  finalizarAtendimento(): void {
    const result$ = this.modalConfirm.showConfirm(
      'Confirmação',
      'Deseja Finalizar Atendimento??',
      'Confirmar'
    );
    result$.asObservable().subscribe(
      (success) => {
        this.atendimento.inicio = this.data + ' ' + this.inicioAtendimento;
        this.atendimento.fim = this.data + ' ' + this.fimAtendimento;
        console.log(this.atendimento);
      },
      (error) => {
        console.error(error);
        this.erroService.tratarErro(error);
      }
    );
  }
}
