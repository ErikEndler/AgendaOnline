import { Servico } from 'src/app/models/servico';
import { Agendamento } from 'src/app/models/agendamento';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-agendamento-form',
  templateUrl: './agendamento-form.component.html',
  styleUrls: ['./agendamento-form.component.css'],
})
export class AgendamentoFormComponent implements OnInit {
  hide = true;
  formulario: FormGroup;
  titulo = '';
  @Input() agendamento: Agendamento;
  servicos: Servico[];
  data: string;
  hrInicial: string;
  hrFinal: string;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      id: [],
      cliente: [],
      funcionario: [],
      horarioInicio: [],
      horarioFim: [],
      notificacao: [],
    });
  }
  onSave() {}
  onClose() {}
}
