import { ServicoService } from './../../servico.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalConfirmacaoService } from 'src/app/shared/modal-confirmacao.service';
import { switchMap, take } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-servico',
  templateUrl: './servico.component.html',
  styleUrls: ['./servico.component.css'],
})
export class ServicoComponent implements OnInit {
  formulario: FormGroup;
  hide = true;
  loading = false;
  debugEnable = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private servicoService: ServicoService,
    private modalCOnfirm: ModalConfirmacaoService
  ) {}

  ngOnInit(): void {
    const servico = this.route.snapshot.data['servico'];
    this.formulario = this.formBuilder.group({
      id: [servico.id],
      nome: [servico.nome, Validators.required],
      descricao: [servico.descricao],
    });
  }
  onSubmit(): void {
    if (this.formulario.valid) {
      const result$ = this.modalCOnfirm.showConfirm(
        'Confirmação',
        'Deseja Salvar??',
        'Confirmaaarrr'
      );
      result$
        .asObservable()
        .pipe(
          take(1),
          switchMap((result) =>
            result ? this.servicoService.save(this.formulario.value) : EMPTY
          )
        )
        .subscribe(
          (success) => console.log('salvo com sucesso!'),
          (error) => {
            console.error(error), console.log('ERRO AO SALVAR');
          }
        );
      console.log(this.formulario.value);
    }
  }
  onCancel(): void {
    this.formulario.reset();
  }

  debug(): void {
    this.debugEnable = !this.debugEnable;
  }
}
