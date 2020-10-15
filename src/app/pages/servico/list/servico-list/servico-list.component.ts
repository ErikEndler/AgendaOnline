import { ServicoService } from './../../servico.service';
import { Servico } from './../../../../models/servico';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-servico-list',
  templateUrl: './servico-list.component.html',
  styleUrls: ['./servico-list.component.css'],
})
export class ServicoListComponent implements OnInit {
  loading = false;
  page = 1;
  pageSize = 4;
  collectionSize: any;
  servicos: Servico[];
  colunas: string[] = ['id', 'categoria id', 'nome', 'descricao', 'opções'];
  lista: Servico[];

  constructor(private servicoService: ServicoService, private router: Router) {}

  ngOnInit(): void {
    this.list();
  }
  onEdit(id): void {
    this.router.navigate(['servicoEditar', id]);
  }
  list(): void {
    this.loading = true;
    this.servicoService.list().subscribe((dados) => {
      this.lista = dados;
      this.collectionSize = this.lista.length;
      this.loading = false;
      this.refresh();
      // this.lista = this.usuarios;
    }),
      (error) => {
        console.log(error);
      };
  }
  refresh(): void {
    this.servicos = this.lista
      .map((usuario, i) => ({ ...usuario }))
      .slice(
        (this.page - 1) * this.pageSize,
        (this.page - 1) * this.pageSize + this.pageSize
      );
  }
}
