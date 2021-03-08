import { Component, Input, OnInit } from '@angular/core';
import { NotificationType } from 'angular2-notifications';
import { NotificacaoService } from 'src/app/shared/notificacao/notificacao.service';
import { AgendamentoService } from '../../agendamento.service';
import { ServicoFuncionario } from 'src/app/models/servico-funcionario';
import { EtapasService } from '../etapas.service';
import { Agendamento } from 'src/app/models/agendamento';
import { ErroService } from 'src/app/shared/erro/erro.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-etapa04',
  templateUrl: './etapa04.component.html',
  styleUrls: ['./etapa04.component.css'],
})
export class Etapa04Component implements OnInit {
  @Input() clienteNome;
  agendamento: Agendamento;
  servicoFuncionario: ServicoFuncionario;
  data: string;
  hora: string;
  constructor(
    private etapasService: EtapasService,
    private agendamentoService: AgendamentoService,
    private notificacaoService: NotificacaoService,
    private router: Router,
    private erroService: ErroService
  ) { }

  ngOnInit(): void {
    // this.agendamento = new Agendamento();
    this.etapasService.eventoServicoFuncionario.subscribe(
      (result) => (this.servicoFuncionario = result)
    );
    this.etapasService.eventoAgendamento.subscribe((result) => {
      this.agendamento = result;
      this.data = this.agendamento.horarioInicio.slice(0, 10);
      this.hora = this.agendamento.horarioInicio.slice(-5);
      console.log('data ', this.agendamento.horarioInicio);
      console.log('data ', this.data);
      console.log('hora ', this.hora);
    });
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
        this.router.navigate(['meusagendamentos']);

      },
      (error) => {
        console.error(error);
        this.erroService.tratarErro(error);
      }
    );
  }
}
