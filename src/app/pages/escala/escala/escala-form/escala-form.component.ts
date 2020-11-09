import { ServicoEscalaFormComponent } from './../../servico-escala-form/servico-escala-form.component';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalConfirmacaoService } from 'src/app/shared/modal-confirmacao.service';

@Component({
  selector: 'app-escala-form',
  templateUrl: './escala-form.component.html',
  styleUrls: ['./escala-form.component.css']
})
export class EscalaFormComponent implements OnInit {
  formulario: FormGroup;

  @Input() servicoIn;

  constructor(private formBuilder: FormBuilder, private modalCOnfirm: ModalConfirmacaoService,

  ) { }

  ngOnInit(): void {

    console.log("comsole log aki" + this.servicoIn);

    this.formulario = this.formBuilder.group({
      id: [],
      diaSemana: [],
      servico: [],
    });
  }
  onSubmit() {
    console.log("comsole log aki" + this.servicoIn);
    console.log(this.formulario.value);
  }

}
