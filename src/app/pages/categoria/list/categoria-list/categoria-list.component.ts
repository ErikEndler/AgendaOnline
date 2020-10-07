import { CategoriaService } from './../../categoria.service';
import { Categoria } from './../../../../models/categoria';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
    private router: Router
  ) {}

  ngOnInit(): void {
    this.list();
  }
  onEdit(id): void {
    this.router.navigate(['categoriaEditar', id]);
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
      (error) => {};
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
