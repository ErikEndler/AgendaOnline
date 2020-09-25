import { UsuarioService } from './../../usuario.service';
import { Usuario } from './../../../../models/usuario';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuario-list',
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario-list.component.css'],
})
export class UsuarioListComponent implements OnInit {
  page = 1;
  pageSize = 4;
  collectionSize: any;
  usuarios: Usuario[];
  colunas: string[] = [
    'id',
    'nome',
    'cpf',
    'sexo',
    'email',
    'telefone',
    'whatsapp',
    'Opçóes',
  ];
  loading = false;

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  lista: Usuario[];
  ngOnInit(): void {
    this.list();
  }
  onEdit(id): void {
    this.router.navigate(['usuarioEditar', id]);
  }
  list(): void {
    this.loading = true;
    this.usuarioService.list().subscribe((dados) => {
      this.lista = dados;
      this.collectionSize = this.lista.length;
      this.loading = false;
      this.refreshUsuarios();
      // this.lista = this.usuarios;
    }),
      (error) => {};
  }
  refreshUsuarios(): void {
    this.usuarios = this.lista
      .map((usuario, i) => ({ ...usuario }))
      .slice(
        (this.page - 1) * this.pageSize,
        (this.page - 1) * this.pageSize + this.pageSize
      );
  }
}
