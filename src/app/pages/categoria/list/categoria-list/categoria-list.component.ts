import { CategoriaService } from './../../categoria.service';
import { Categoria } from './../../../../models/categoria';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { switchMap, take } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { ModalConfirmacaoService } from 'src/app/shared/modal-confirmacao.service';

@Component({
  selector: 'app-categoria-list',
  templateUrl: './categoria-list.component.html',
  styleUrls: ['./categoria-list.component.css'],
})
export class CategoriaListComponent implements OnInit {
  loading = false;
  page = 1;
  pageSize = 4;
  collectionSize: any;
  categorias: Categoria[];
  colunas: string[] = ['id', 'nome', 'descricao', 'opções'];
  lista: Categoria[];

  constructor(
    private categoriaService: CategoriaService,
    private modalCOnfirm: ModalConfirmacaoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.list();
  }
  onEdit(id): void {
    this.router.navigate(['categoriaEditar', id]);
  }
  onDelete(id): void {
    const result$ = this.modalCOnfirm.showConfirm(
      'Confirmação',
      'Deseja Excluir??',
      'Confirmar'
    );
    result$
      .asObservable()
      .pipe(
        take(1),
        switchMap((result) =>
          result ? this.categoriaService.remove(id) : EMPTY
        )
      )
      .subscribe(

        (success) => {
          console.log('Excluido com sucesso!');
          console.log('Excluido com sucesso!'), this.ngOnInit();
        },
        (error) => {
          console.error(error),
            console.log(error),
            console.log('ERRO AO EXCLUI');
        }
      );
  }
  list(): void {
    this.loading = true;
    this.categoriaService.list().subscribe((dados) => {
      this.lista = dados;
      this.collectionSize = this.lista.length;
      this.loading = false;
      this.refresh();
      // this.lista = this.usuarios;
    }),
      (error) => { };
  }
  refresh(): void {
    this.categorias = this.lista
      .map((usuario, i) => ({ ...usuario }))
      .slice(
        (this.page - 1) * this.pageSize,
        (this.page - 1) * this.pageSize + this.pageSize
      );
  }
}
