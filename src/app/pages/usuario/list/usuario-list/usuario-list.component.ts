import { UsuarioService } from './../../usuario.service';
import { Usuario } from './../../../../models/usuario';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalConfirmacaoService } from 'src/app/shared/modal-confirmacao.service';
import { switchMap, take } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

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
    'opções',
  ];
  loading = false;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private modalCOnfirm: ModalConfirmacaoService,
    private serviceUsuario: UsuarioService
  ) { }

  lista: Usuario[];
  ngOnInit(): void {
    this.list();
  }
  onEdit(id): void {
    this.router.navigate(['usuarioEditar', id]);
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
          result ? this.serviceUsuario.remove(id) : EMPTY
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
    this.usuarioService.list().subscribe((dados) => {
      this.lista = dados;
      this.collectionSize = this.lista.length;
      this.loading = false;
      this.refreshUsuarios();
      // this.lista = this.usuarios;
    }),
      (error) => { };
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
