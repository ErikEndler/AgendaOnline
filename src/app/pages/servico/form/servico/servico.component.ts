import { error } from 'protractor';
import { NotificacaoService } from './../../../../shared/notificacao/notificacao.service';
import { ErroService } from './../../../../shared/erro/erro.service';
import { Categoria } from './../../../../models/categoria';
import { CategoriaService } from './../../../categoria/categoria.service';
import { ServicoService } from './../../servico.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalConfirmacaoService } from 'src/app/shared/modal-confirmacao/modal-confirmacao.service';
import { switchMap, take } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { NotificationType } from 'angular2-notifications';

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
  categorias: Categoria[];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private servicoService: ServicoService,
    private modalCOnfirm: ModalConfirmacaoService,
    private categoriaService: CategoriaService,
    private notificacaoService: NotificacaoService,
    private erroService: ErroService
  ) {}

  ngOnInit(): void {
    this.combobox();
    const servico = this.route.snapshot.data['servico'];
    this.formulario = this.formBuilder.group({
      id: [servico.id],
      categoria: [servico.categoria],
      //categoria: this.formBuilder.group({id: [],nome: [],descricao: [],}),
      nome: [servico.nome],
      descricao: [servico.descricao],
    });
  }
  combobox(): void {
    this.categoriaService
      .list()
      .subscribe(
        (result) => (
          (this.categorias = result), console.log('result : ' + result)
        )
      );
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
            result ? this.servicoService.save(this.formulario.value) : EMPTY
          )
        )
        .subscribe(
          (success) => {
            this.notificacaoService.criar(
              NotificationType.Success,
              'Salvo com Sucesso'
            );
            console.log('Serviço salvo com sucesso!');
          },
          (error) => {
            console.error(error);
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
  comparaCategoria(obj1, obj2) {
    return obj1 && obj2 ? obj1.id === obj2.id : obj1 === obj2;
  }
}
