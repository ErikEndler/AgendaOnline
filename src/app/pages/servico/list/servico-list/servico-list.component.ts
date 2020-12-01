import { ErroService } from './../../../../shared/erro/erro.service';
import { ServicoService } from './../../servico.service';
import { Servico } from './../../../../models/servico';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalConfirmacaoService } from 'src/app/shared/modal-confirmacao/modal-confirmacao.service';
import { switchMap, take } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-servico-list',
  templateUrl: './servico-list.component.html',
  styleUrls: ['./servico-list.component.css'],
})
export class ServicoListComponent implements OnInit {
  loading = true;
  page = 1;
  pageSize = 4;
  collectionSize: any;
  servicos: Servico[];
  colunas: string[] = ['id', 'nome', 'descricao', 'categoria', 'opções'];
  lista: Servico[];

  constructor(
    private servicoService: ServicoService,
    private router: Router,
    private modalCOnfirm: ModalConfirmacaoService,
    private erroService: ErroService
  ) {}

  ngOnInit(): void {
    this.list();
  }
  onEdit(id): void {
    this.router.navigate(['servicoEditar', id]);
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
        switchMap((result) => (result ? this.servicoService.remove(id) : EMPTY))
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
    this.servicoService.list().subscribe(
      (dados) => {
        this.lista = dados;
        this.collectionSize = this.lista.length;
        this.loading = false;
        this.refresh();
        // this.lista = this.usuarios;
      },
      (error) => {
        console.error(error);
        this.erroService.tratarErro(error);
      }
    );
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
