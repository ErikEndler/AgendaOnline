import { ServicoFuncionarioService } from './../../servico-funcionario/servico-funcionario.service';
import { AgendamentoService } from './../agendamento.service';
import { Servico } from 'src/app/models/servico';
import { Agendamento } from 'src/app/models/agendamento';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-agendamento-form',
  templateUrl: './agendamento-form.component.html',
  styleUrls: ['./agendamento-form.component.css'],
})
export class AgendamentoFormComponent implements OnInit {
  hide = true;
  campoData = false;
  campoServico = false;
  formulario: FormGroup;
  titulo = '';
  agendamento: Agendamento;
  funcionarioID: number;
  servicos: Servico[];
  data: string;
  hrInicial: string;
  hrFinal: string;
  confirmResult: Subject<any>;

  constructor(
    private servicoFuncionarioService: ServicoFuncionarioService,
    public bsModalRef: BsModalRef
  ) { }

  ngOnInit(): void {
    this.confirmResult = new Subject();
    this.servicoFuncionarioService.listarServicosFuncionario(this.funcionarioID).subscribe((result) => {
      this.servicos = result, console.log(this.funcionarioID);
    });

  }
  selecionarData(event) {
    this.campoData = true;
  }
  selecionarServico() {
    this.campoServico = true;
  }
  atribuirHr() {
  }
  onSave(): void { }
  onClose(): void {
    this.confirmAndCLose(false);
  }
  confirmAndCLose(value: boolean, agendamento?: Agendamento): void {
    if (value === false) {
      this.confirmResult.next(value);
      this.bsModalRef.hide();
    }
    if (value === true) {
      this.confirmResult.next(agendamento);
      this.bsModalRef.hide();
    }
  }
}
