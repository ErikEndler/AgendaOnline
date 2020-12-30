import { Agendamento } from './../../../../models/agendamento';
import { Observable } from 'rxjs';
import { Escala } from './../../../../models/escala';
import { EscalaService } from './../../../escala/escala.service';
import { Component, Input, OnInit } from '@angular/core';
import { ServicoFuncionario } from 'src/app/models/servico-funcionario';
import { ServicoFuncionarioService } from 'src/app/pages/servico-funcionario/servico-funcionario.service';
import { ErroService } from 'src/app/shared/erro/erro.service';
import { EtapasService } from '../etapas.service';
import * as moment from 'moment';
import { NotificacaoService } from 'src/app/shared/notificacao/notificacao.service';
import { NotificationType } from 'angular2-notifications';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/pages/usuario/usuario.service';

@Component({
  selector: 'app-etapa03',
  templateUrl: './etapa03.component.html',
  styleUrls: ['./etapa03.component.css'],
})
export class Etapa03Component implements OnInit {
  @Input() clienteId: number;
  listempy = false;
  horariosHide = true;
  page = 1;
  pageSize = 4;
  collectionSize: any;
  loading = false;
  avancar: false;
  dias: string[] = [];
  servicoFuncionario: ServicoFuncionario;
  escalas$: Observable<Escala[]>;
  agendamento: Agendamento = new Agendamento();
  data: string;
  hrInicial: string;
  hrFinal: string;

  constructor(
    private erroService: ErroService,
    private etapasService: EtapasService,
    private escalaService: EscalaService,
    private notificacaoService: NotificacaoService,
    private usuarioService: UsuarioService

  ) { }

  ngOnInit(): void {
    this.agendamento.notificacao = true;
    this.etapasService.eventoServicoFuncionario.subscribe((result) => {
      this.servicoFuncionario = result;
      this.agendamento.servicoFuncionario = result;
      this.buscaEscala();
    });
    this.usuarioService.loadByID(this.clienteId).subscribe((result) => this.agendamento.cliente = result);
  }
  buscaEscala(): void {
    this.escalas$ = this.escalaService.listarPorServicoFuncionario(
      this.servicoFuncionario.id
    );
    this.dias = [];
    this.escalas$.subscribe((result) =>
      result.forEach((e) => {
        if (e.itensEscala.length > 0) {
          this.dias.push(e.diaSemana);
        }
      })
    );
  }
  dayselect(valor): void {
    moment.locale('pt-br');
    this.loading = true;
    console.log(moment(valor).format('yyyy-MM-DD'));
    console.log(moment().format('yyyy-MM-DD'));

    if (moment(valor).format('yyyy-MM-DD') >= moment().format('yyyy-MM-DD')) {
      if (this.dias.indexOf(moment(valor).format('dddd')) !== -1) {
        this.data = valor;
        this.horariosHide = false;
      } else {
        this.horariosHide = true;
        this.notificacaoService.criar(
          NotificationType.Warn,
          moment(valor).format('dddd'),
          'Fora da escala'
        );
      }
    } else {
      this.horariosHide = true;
      this.notificacaoService.criar(
        NotificationType.Warn,
        'Erro',
        'Selecione data apartir da data atual'
      );
    }

    this.loading = false;
  }
  selectHora(): void {
    this.hrFinal = moment(this.hrInicial, 'HH:mm')
      .add(this.servicoFuncionario.servico.tempo, 'm')
      .format('HH:mm');
    this.agendamento.horarioInicio = this.data + ' ' + this.hrInicial;
    this.agendamento.horarioFim = this.data + ' ' + this.hrFinal;
  }
  finalizar(): void {
    console.log(this.agendamento);
    this.etapasService.emiteAgendamento(this.agendamento);
  }
}
