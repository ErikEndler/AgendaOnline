import { AtendimentoService } from '../../atendimento.service';
import { UsuarioService } from '../../../usuario/usuario.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Agendamento } from 'src/app/models/agendamento';
import * as moment from 'moment';
import { Atendimento } from 'src/app/models/atendimento';
import { TokenService } from 'src/app/auth/token.service';
import { LoginReturn } from 'src/app/models/loginReturn';
import { ModalConfirmacaoService } from 'src/app/shared/modal-confirmacao/modal-confirmacao.service';
import { ErroService } from 'src/app/shared/erro/erro.service';
import { NotificacaoService } from 'src/app/shared/notificacao/notificacao.service';
import { NotificationType } from 'angular2-notifications';

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
  cronometro = false;
  horarios = false;
  emAtendimento = false;
  campos = true;

  constructor(
    private route: ActivatedRoute,
    private tokenService: TokenService,
    private usuarioService: UsuarioService,
    private erroService: ErroService,
    private modalConfirm: ModalConfirmacaoService,
    private notificacaoService: NotificacaoService,
    private atendimentoService: AtendimentoService
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

  startInfinito(): void {
    //this.horarios = true;
    this.inicioAtendimento = moment().format('HH:mm');
    this.btn1 = 'Atendendo...';
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
    clearInterval(this.interval);
    this.time = 0;
    this.segundos = 0;
    this.btn1 = 'Iniciar Atendimento';
    this.btn1Disabled = false;
    this.inicioAtendimento = '';
    this.fimAtendimento = '';
  }
  finalizarAtendimento(): void {
    if (this.inicioAtendimento && this.fimAtendimento) {
      const result$ = this.modalConfirm.showConfirm(
        'Confirmação',
        'Deseja Finalizar Atendimento? Das ' +
          this.inicioAtendimento +
          ' as ' +
          this.fimAtendimento,
        'Confirmar'
      );
      result$.asObservable().subscribe(
        (result) => {
          if (result) {
            this.atendimento.inicio = this.data + ' ' + this.inicioAtendimento;
            this.atendimento.fim = this.data + ' ' + this.fimAtendimento;
            console.log(this.atendimento);
            this.atendimentoService.save(this.atendimento).subscribe(
              () => {
                this.notificacaoService.criar(
                  NotificationType.Success,
                  'Salvo com Sucesso'
                );
              },
              (error) => {
                console.error(error);
                this.erroService.tratarErro(error);
              }
            );
          }
        },
        (error) => {
          console.error(error);
          this.erroService.tratarErro(error);
        }
      );
    }
  }
  atenderAgora(): void {
    this.emAtendimento = true;
    this.cronometro = true;
    this.campos = true;
    this.startInfinito();
  }
  lancarAtendimento(): void {
    this.emAtendimento = true;
    this.horarios = true;
    this.campos = false;
  }
  cancelarAtendimento(): void {
    this.emAtendimento = false;
    this.cronometro = false;
    this.horarios = false;
    this.clearTime();
  }
}
