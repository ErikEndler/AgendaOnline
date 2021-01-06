import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalConfirmacaoService } from 'src/app/shared/modal-confirmacao/modal-confirmacao.service';
import { switchMap, take } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { NotificationType } from 'angular2-notifications';
import { NotificacaoService } from 'src/app/shared/notificacao/notificacao.service';
import { ErroService } from 'src/app/shared/erro/erro.service';
import { Categoria } from 'src/app/models/categoria';
import { CategoriaService } from 'src/app/pages/categoria/categoria.service';
import { ServicoService } from '../servico.service';

@Component({
  selector: 'app-servico-form',
  templateUrl: './servico-form.component.html',
  styleUrls: ['./servico-form.component.css'],
})
export class ServicoFormComponent implements OnInit {
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
    private erroService: ErroService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.combobox();
    const servico = this.route.snapshot.data['servico'];
    this.formulario = this.formBuilder.group({
      id: [servico.id],
      categoria: [servico.categoria, Validators.required],
      tempo: [servico.tempo, Validators.required],
      nome: [servico.nome, Validators.required],
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
  verificaValidTouched(campo): boolean {
    return (
      !this.formulario.get(campo).valid && this.formulario.get(campo).touched
    );
  }
  addCategoria() {
    this.router.navigate(['categoria']);
  }
}
