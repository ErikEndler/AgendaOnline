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
import { ActivatedRoute, Router } from '@angular/router';
import { Agendamento } from 'src/app/models/agendamento';
// https://api.whatsapp.com/send?phone=5562991507989&text=oi%20tudo%20bem
@Component({
  selector: 'app-agendamento-form',
  templateUrl: './agendamento-form.component.html',
  styleUrls: ['./agendamento-form.component.css'],
})
export class AgendamentoFormComponent implements OnInit {
  agendamento: Agendamento;
  funcionarioID: number;
  listaFuncionarios: Usuario[];
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
  listaStatus: string[];
  disableSelect = true;
  btnAtender = false;
  statusPendente: boolean;
  msgSUcesso = 'Agendamento Salvo com Sucesso';
  textoconfirmacao =
    'Confirme o agendamento e muda seu STATUS para "AGENDADO"!';
  constructor(
    private servicoFuncionarioService: ServicoFuncionarioService,
    private usuarioService: UsuarioService,
    private agendamentoService: AgendamentoService,
    private notificacaoService: NotificacaoService,
    private erroService: ErroService,
    private activatedRoute: ActivatedRoute,
    private escalaService: EscalaService,
    private tokenService: TokenService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.agendamento = this.activatedRoute.snapshot.data.agendamento;
    if (this.agendamento.status === 'AGENDADO') {
      this.btnAtender = true;
    }
    if (this.agendamento.status === 'PENDENTE') {
      this.statusPendente = true;
    }
    console.log(this.agendamento);
    if (this.agendamento.id) {
      this.dataHora();
      this.selecionarServico();
    }
    this.listarStatus();
    this.listarFuncionarios();
    this.listarSF();
    this.loginReturn = this.tokenService.decodePayloadJWT();
    this.funcionarioID = this.loginReturn.id;
    this.usuarioService.list().subscribe((result) => (this.usuarios = result));
    this.conflitos();
  }

  listarStatus(): void {
    this.agendamentoService.listaStatus().subscribe(
      (result) => {
        this.listaStatus = result;
      },
      (error) => {
        console.error(error);
        this.erroService.tratarErro(error);
      }
    );
  }
  listarFuncionarios(): void {
    this.usuarioService.listarFuncionarios().subscribe(
      (result) => {
        this.listaFuncionarios = result;
      },
      (error) => {
        console.error(error);
        this.erroService.tratarErro(error);
      }
    );
  }
  listarSF(): void {
    this.servicoFuncionarioService
      .listarServicosFuncionario(
        this.agendamento.servicoFuncionario.funcionario.id
      )
      .subscribe(
        (result) => {
          this.listaServicoFuncionario = result;
        },
        (error) => {
          console.error(error);
          this.erroService.tratarErro(error);
        }
      );
  }
  dataHora(): void {
    this.hrFinal = this.agendamento.horarioFim.slice(-5);
    console.log(this.hrFinal);
    this.hrInicial = this.agendamento.horarioInicio.slice(-5);
    console.log(this.hrInicial);
    this.data = this.agendamento.horarioInicio.slice(0, 10);
    console.log(this.data);
  }
  selecionarServico(): void {
    this.tempo = this.agendamento.servicoFuncionario.servico.tempo;
    console.log(this.tempo);
    this.buscaEscalas();
  }
  atribuirHr(): void {
    this.hrFinal = moment(this.hrInicial, 'HH:mm')
      .add(this.tempo, 'm')
      .format('HH:mm');
    this.agendamento.horarioInicio = this.data + ' ' + this.hrInicial;
    this.agendamento.horarioFim = this.data + ' ' + this.hrFinal;
  }
  buscaEscalas(): void {
    this.escalaService
      .listarPorServicoFuncionario(this.agendamento.servicoFuncionario.id)
      .subscribe(
        (result) => {
          this.escalas = result;
          console.log(result);
        },
        (error) => {
          console.error(error);
          this.erroService.tratarErro(error);
        }
      );
  }
  onSave(msg?: string): void {
    this.atribuirHr();
    console.log(this.agendamento);
    this.agendamentoService.save(this.agendamento).subscribe(
      (result) => {
        this.notificacaoService.criar(
          NotificationType.Success,
          msg ? msg : this.msgSUcesso
        );
        console.log('Agendamento salvo com sucesso!');
        this.router.navigate(['agendamento']);
      },
      (error) => {
        console.error(error);
        this.erroService.tratarErro(error);
      }
    );
  }
  comparar(obj1, obj2): boolean {
    return obj1 && obj2 ? obj1.id === obj2.id : obj1 === obj2;
  }
  compararStatus(obj1, obj2): boolean {
    return obj1 && obj2 ? obj1 === obj2 : obj1 === obj2;
  }
  atender(): void {
    this.router.navigate(['atendimento/atender/' + this.agendamento.id]);
  }
  cancel(): void {
    if (this.disableSelect === false) {
      this.disableSelect = true;
    } else {
      this.router.navigate(['agendamento']);
    }
  }
  onEdit(): void {
    this.disableSelect = false;
  }
  confirmar(): void {
    this.agendamento.status = 'AGENDADO';
    this.onSave('Agendamento Confirmado');
  }
  sendWhatsapp(): void {
    window.open(
      'https://api.whatsapp.com/send?phone=' + this.agendamento.cliente.whatsapp
    );
  }
  conflitos() {
    this.agendamentoService
      .listaAgendamentosConflitamtes(this.agendamento.id)
      .subscribe((result) => console.log('conflitos : ', result));
  }
}
