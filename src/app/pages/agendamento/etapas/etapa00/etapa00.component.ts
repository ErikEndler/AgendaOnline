import { Observable } from 'rxjs';
import { UsuarioService } from 'src/app/pages/usuario/usuario.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ErroService } from 'src/app/shared/erro/erro.service';
import { Usuario } from 'src/app/models/usuario';
import { EtapasService } from '../etapas.service';

@Component({
  selector: 'app-etapa00',
  templateUrl: './etapa00.component.html',
  styleUrls: ['./etapa00.component.css'],
})
export class Etapa00Component implements OnInit {
  constructor(
    private router: Router,
    private erroService: ErroService,
    private usuarioService: UsuarioService,
    private etapasService: EtapasService
  ) {}
  loading = false;
  listempy = true;
  page = 1;
  pageSize = 4;
  collectionSize: any;
  colunas: string[] = ['nome', 'cpf', 'email', 'select'];
  listaUsuarios$: Observable<Usuario[]>;
  listaUsuarios: Usuario[];
  usuarios: Usuario[];

  ngOnInit(): void {
    this.listar();
  }
  listar(): void {
    this.listaUsuarios$ = this.usuarioService.list();
    this.listaUsuarios$.subscribe(
      (result) => {
        this.listaUsuarios = result;
        this.collectionSize = result.length;
        this.loading = false;
        if (result.length > 0) {
          this.listempy = false;
        }
        this.refresh();
      },
      (error) => {
        console.error(error);
        this.erroService.tratarErro(error);
        this.loading = false;
      }
    );
  }
  refresh(): void {
    this.usuarios = this.listaUsuarios
      .map((servico, i) => ({ ...servico }))
      .slice(
        (this.page - 1) * this.pageSize,
        (this.page - 1) * this.pageSize + this.pageSize
      );
  }
  cancelar(): void {
    this.router.navigate(['agendamento']);
  }
  selecionarUsuario(cliente: Usuario): void {
    this.etapasService.emiteCliente(cliente);
  }
}
