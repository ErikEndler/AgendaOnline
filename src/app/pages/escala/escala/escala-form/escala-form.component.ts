import { EscalaService } from './../escala.service';
import { ServicoEscalaFormService } from './../../servico-escala-form.service';
import { Component, OnInit } from '@angular/core';
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
  servicoIn: Servico;

  constructor(
    private formBuilder: FormBuilder,
    private modalCOnfirm: ModalConfirmacaoService,
    private servicoEscalaFormService: ServicoEscalaFormService,
    private escalaService: EscalaService
  ) { }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      id: [],
      diaSemana: [],
      servico: [],
    });
    this.comboboxDays();
    this.servicoEscalaFormService.emitirServico.subscribe(result => {
      console.log('result do subscribe no evento : ', result);
      this.servicoIn = result;
      this.formulario.controls['servico'].setValue(this.servicoIn?.id);
    });
    console.log('comsole log aki init :' + this.servicoIn);

  }

  onSubmit(): void {
    // this.funcao();
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
            this.escalaService.salvarEscala();
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

  comboboxDays(): void {
    this.escalaService.listaDayWeek().subscribe(
      (result) => { this.daysWeek = result; console.log('dias semana listados: ', result); },
      (error) => {
        console.error(error), console.log('ERRO AO LISTAR');
      });

  }
}
