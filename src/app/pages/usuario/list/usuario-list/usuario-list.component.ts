import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalConfirmacaoService } from 'src/app/shared/modal-confirmacao/modal-confirmacao.service';
import { switchMap, take } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from '../../usuario.service';
import { ErroService } from 'src/app/shared/erro/erro.service';

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
    'email',
    'sexo',
    'telefone',
    'whatsapp',
    'opções',
  ];
  loading = true;
  lista: Usuario[];

  constructor(
    private router: Router,
    private modalCOnfirm: ModalConfirmacaoService,
    private serviceUsuario: UsuarioService,
    private erroService: ErroService
  ) {}

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
        switchMap((result) => (result ? this.serviceUsuario.remove(id) : EMPTY))
      )
      .subscribe(
        (success) => {
          console.log('Excluido com sucesso!');
          console.log('Excluido com sucesso!'), this.ngOnInit();
        },
        (error) => {
          console.error(error);
          this.erroService.tratarErro(error);
        }
      );
  }
  list(): void {
    this.loading = true;
    this.serviceUsuario.list().subscribe(
      (dados) => {
        this.lista = dados;
        this.collectionSize = this.lista.length;
        this.loading = false;
        this.refreshUsuarios();
      },
      (error) => {
        console.error(error);
        this.erroService.tratarErro(error);
      }
    );
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
