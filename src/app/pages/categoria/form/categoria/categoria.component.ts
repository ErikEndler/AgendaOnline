import { ActivatedRoute } from '@angular/router';
import { CategoriaService } from './../../categoria.service';
import { Component, OnInit } from '@angular/core';
import { EMPTY } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalConfirmacaoService } from '../../../../shared/modal-confirmacao/modal-confirmacao.service';
import { switchMap, take } from 'rxjs/operators';
import { ErroService } from 'src/app/shared/erro/erro.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css'],
})
export class CategoriaComponent implements OnInit {
  formulario: FormGroup;
  hide = true;
  loading = false;
  debugEnable = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private categoriaService: CategoriaService,
    private modalCOnfirm: ModalConfirmacaoService,
    private erroService: ErroService
  ) {}

  ngOnInit(): void {
    const categoria = this.route.snapshot.data['categoria'];
    this.formulario = this.formBuilder.group({
      id: [categoria.id],
      nome: [categoria.nome, Validators.required],
      descricao: [categoria.descricao],
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
          switchMap((result) =>
            result ? this.categoriaService.save(this.formulario.value) : EMPTY
          )
        )
        .subscribe(
          (success) => console.log('salvo com sucesso!'),
          (error) => {
            console.error(error);
            console.log('ERRO AO SALVAR');
            this.erroService.tratarErro(error);
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
