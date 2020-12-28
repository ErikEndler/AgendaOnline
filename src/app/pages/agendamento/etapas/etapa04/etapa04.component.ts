import { ServicoFuncionario } from './../../../../models/servico-funcionario';
import { EtapasService } from './../etapas.service';
import { Agendamento } from './../../../../models/agendamento';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-etapa04',
  templateUrl: './etapa04.component.html',
  styleUrls: ['./etapa04.component.css']
})
export class Etapa04Component implements OnInit {

  @Input() clienteNome;
  agendamento: Agendamento;
  servicoFuncionario: ServicoFuncionario;
  data: string;
  hora: string;
  constructor(private etapasService: EtapasService) { }

  ngOnInit(): void {
    this.agendamento = new Agendamento();
    this.etapasService.eventoServicoFuncionario.subscribe((result) => this.servicoFuncionario = result);
    this.etapasService.eventoAgendamento.subscribe((result) => {
      this.agendamento = result;
      this.data = this.agendamento.horarioInicio.slice(10);
      this.hora = this.agendamento.horarioInicio.slice(-4);
      console.log('data ', this.data);
      console.log('hora ', this.hora);
    });
  }

}
