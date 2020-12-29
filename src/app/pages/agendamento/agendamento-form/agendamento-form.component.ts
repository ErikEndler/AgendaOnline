import { LoginReturn } from './../../../models/loginReturn';
import { TokenService } from './../../../auth/token.service';
import { EscalaService } from './../../escala/escala.service';
import { Escala } from './../../../models/escala';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ServicoFuncionario } from 'src/app/models/servico-funcionario';
import { Usuario } from 'src/app/models/usuario';
import { ServicoFuncionarioService } from '../../servico-funcionario/servico-funcionario.service';
import { AgendamentoService } from '../agendamento.service';
import { ErroService } from 'src/app/shared/erro/erro.service';
import { NotificacaoService } from 'src/app/shared/notificacao/notificacao.service';
import { UsuarioService } from '../../usuario/usuario.service';
import * as moment from 'moment';
import { NotificationType } from 'angular2-notifications';
import { ActivatedRoute } from '@angular/router';
import { Agendamento } from 'src/app/models/agendamento';

@Component({
  selector: 'app-agendamento-form',
  templateUrl: './agendamento-form.component.html',
  styleUrls: ['./agendamento-form.component.css'],
})
export class AgendamentoFormComponent implements OnInit {
  agendamento: Agendamento = new Agendamento();
  funcionarioID: number;
  listaServicoFuncionario: ServicoFuncionario[];
  servicoFuncionario: ServicoFuncionario;
  usuarios: Usuario[];
  data: string;
  hrInicial: string;
  hrFinal: string;
  confirmResult: Subject<any>;
  tempo: string;
  escalas: Escala[];
  loginReturn: LoginReturn;

  constructor(
    private servicoFuncionarioService: ServicoFuncionarioService,
    private usuarioService: UsuarioService,
    private agendamentoService: AgendamentoService,
    private notificacaoService: NotificacaoService,
    private erroService: ErroService,
    private activatedRoute: ActivatedRoute,
    private escalaService: EscalaService,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      console.log(params);
      if (params.agendamentoId) {
        this.buscaAgendamento(params.agendamentoId);
      }
    });
    this.loginReturn = this.tokenService.decodePayloadJWT();
    this.funcionarioID = this.loginReturn.id;

    this.usuarioService.list().subscribe((result) => (this.usuarios = result));
  }
  listarSF(): void {
    this.servicoFuncionarioService
      .listarServicosFuncionario(this.funcionarioID)
      .subscribe(
        (result) => {
          (this.listaServicoFuncionario = result),
            console.log(this.funcionarioID);
        },
        (error) => {
          console.error(error);
          this.erroService.tratarErro(error);
        }
      );
  }
  buscaAgendamento(agendamentoId: number): void {
    this.agendamentoService.loadByID(agendamentoId).subscribe((result) => {
      this.agendamento = result;
      this.hrFinal = this.agendamento.horarioFim.slice(-4);
      this.hrInicial = this.agendamento.horarioInicio.slice(-4);
      this.data = this.agendamento.horarioInicio.slice(10);
    });
  }
  selecionarServico(): void {
    this.tempo = this.servicoFuncionario.servico.tempo;
    this.agendamento.servicoFuncionario = this.servicoFuncionario;
    this.buscaEscalas(this.servicoFuncionario.id);
  }
  atribuirHr(): void {
    this.hrFinal = moment(this.hrInicial, 'HH:mm')
      .add(this.tempo, 'm')
      .format('HH:mm');
    this.agendamento.horarioInicio = this.data + ' ' + this.hrInicial;
    this.agendamento.horarioFim = this.data + ' ' + this.hrFinal;
  }
  buscaEscalas(idServicoFuncionario: number): void {
    this.escalaService
      .listarPorServicoFuncionario(idServicoFuncionario)
      .subscribe(
        (result) => (this.escalas = result),
        (error) => {
          console.error(error);
          this.erroService.tratarErro(error);
        }
      );
  }
  onSave(): void {
    console.log('agendamento - - ', this.agendamento);
    this.agendamentoService.save(this.agendamento).subscribe(
      (result) => {
        this.notificacaoService.criar(
          NotificationType.Success,
          'Salvo com Sucesso'
        );
        console.log('Agendamento salvo com sucesso!');
      },
      (error) => {
        console.error(error);
        this.erroService.tratarErro(error);
      }
    );
  }
}
