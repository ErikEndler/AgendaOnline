import { EscalaService } from './../escala.service';
import { ServicoEscalaFormService } from './../../servico-escala-form.service';
import { ServicoEscalaFormComponent } from './../../servico-escala-form/servico-escala-form.component';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalConfirmacaoService } from 'src/app/shared/modal-confirmacao.service';
import { Servico } from 'src/app/models/servico';
import { EMPTY } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';

@Component({
  selector: 'app-escala-form',
  templateUrl: './escala-form.component.html',
  styleUrls: ['./escala-form.component.css'],
})
export class EscalaFormComponent implements OnInit {
  formulario: FormGroup;
  daysWeek: Array<string>;

  @Input() servicoIn;

  constructor(
    private formBuilder: FormBuilder,
    private modalCOnfirm: ModalConfirmacaoService,
    private servicoEscalaFormService: ServicoEscalaFormService,
    private escalaService: EscalaService
  ) { }

  ngOnInit(): void {
    this.comboboxDays();
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
    if (this.formulario.valid) {
      const result$ = this.modalCOnfirm.showConfirm(
        'Confirmação',
        'Deseja Salvar??',
        'Confirmar'
      );
      result$
        .asObservable()
        .pipe(take(1),
          switchMap((result) =>
            result ? this.escalaService.save(this.formulario.value) : EMPTY
          )
        ).subscribe(

          (success) => {
            console.log('salvo com sucesso!');
          },
          (error) => {
            console.error(error),
              console.log(error),
              console.log('ERRO AO SALVAR');
          }
        );
      console.log(this.formulario.value);

    }
  }
  funcao() {
    this.formulario.controls['servico'].setValue(this.servicoIn.id);
  }
  comboboxDays() {
    this.escalaService.listaDayWeek().subscribe(
      (result) => { this.daysWeek = result; console.log('dias semana listados: ', result) },
      (error) => {
        console.error(error), console.log('ERRO AO LISTAR');
      });

  }
}
