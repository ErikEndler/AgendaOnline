import { ServicoEscalaFormService } from './../../servico-escala-form.service';
import { ServicoEscalaFormComponent } from './../../servico-escala-form/servico-escala-form.component';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalConfirmacaoService } from 'src/app/shared/modal-confirmacao.service';
import { Servico } from 'src/app/models/servico';

@Component({
  selector: 'app-escala-form',
  templateUrl: './escala-form.component.html',
  styleUrls: ['./escala-form.component.css'],
})
export class EscalaFormComponent implements OnInit {
  formulario: FormGroup;

  @Input() servicoIn;

  constructor(
    private formBuilder: FormBuilder,
    private modalCOnfirm: ModalConfirmacaoService,
    private servicoEscalaFormService: ServicoEscalaFormService
  ) { }

  ngOnInit(): void {
    this.servicoEscalaFormService.emitirServico.subscribe(result => console.log("result do subscribe no evento : ", result));
    console.log('comsole log aki init :' + this.servicoIn);

    this.formulario = this.formBuilder.group({
      id: [],
      diaSemana: [],
      servico: [this.servicoIn],
    });
  }
  onSubmit() {
    this.funcao();
    console.log('comsole log aki : ' + this.servicoIn);
    console.log(this.formulario.value);
  }
  funcao() {
    this.formulario.controls['servico'].setValue(this.servicoIn.nome);
  }
}
