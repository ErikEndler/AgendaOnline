import { ItemEscalaService } from '../item-escala.service';
import { Escala } from './../../../../models/escala';
import { EscalaService } from './../../escala/escala.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalConfirmacaoService } from 'src/app/shared/modal-confirmacao/modal-confirmacao.service';
import { switchMap, take } from 'rxjs/operators';
import { EMPTY, Observable } from 'rxjs';
import { ErroService } from 'src/app/shared/erro/erro.service';

@Component({
  selector: 'app-item-escala-form',
  templateUrl: './item-escala-form.component.html',
  styleUrls: ['./item-escala-form.component.css'],
})
export class ItemEscalaFormComponent implements OnInit {
  formulario: FormGroup;
  escalaIn: Escala;
  botaoAdicionar = true;

  constructor(
    private formBuilder: FormBuilder,
    private modalCOnfirm: ModalConfirmacaoService,
    private escalaService: EscalaService,
    private erroService: ErroService,
    private itemEscalaService: ItemEscalaService
  ) {}

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      id: [],
      escala: [],
      hrInicial: [],
      hrFinal: [],
      qtd: [],
    });
    this.escalaService.eventoEscalaAvancar.subscribe((result) => {
      this.escalaIn = result;
      this.formulario.controls['escala'].setValue(this.escalaIn?.id);
    });
  }
  onSubmit(): void {
    if (this.formulario.valid) {
      const result$ = this.modalCOnfirm.showConfirm(
        'Confirmação',
        'Deseja Salvar??',
        'Confirmar'
      );
      result$
        .asObservable()
        .pipe(
          take(1),
          switchMap((result) => (result ? this.salvar() : EMPTY))
        )
        .subscribe(
          (success) => {
            console.log('salvo com sucesso!');
            this.itemEscalaService.salvarItemEscala();
          },
          (error) => {
            console.error(error);
            this.erroService.tratarErro(error);
          }
        );
    }
  }
  salvar(): Observable<object> {
    const horaInicio = this.formulario.controls['hrInicial'].value + ':00';
    const horaFim = this.formulario.controls['hrFinal'].value + ':00';

    this.formulario.controls['hrInicial'].setValue(horaInicio);
    this.formulario.controls['hrFinal'].setValue(horaFim);

    return this.itemEscalaService.save(this.formulario.value);
  }
  adicionar() {
    this.botaoAdicionar = !this.botaoAdicionar;
  }
}
