import { ServicoEscalaFormService } from './../../servico-escala-form.service';
import { EscalaService } from './../escala.service';
import { Escala } from './../../../../models/escala';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalConfirmacaoService } from 'src/app/shared/modal-confirmacao.service';
import { switchMap, take } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-escala-list',
  templateUrl: './escala-list.component.html',
  styleUrls: ['./escala-list.component.css']
})
export class EscalaListComponent implements OnInit {
  loading = true;
  listempy = true;
  page = 1;
  pageSize = 4;
  collectionSize: any;
  escalas: Escala[];
  colunas: string[] = ['#', 'serviço', 'dia semana', 'opções'];
  lista: Escala[];

  constructor(
    private escalaService: EscalaService,
    private servicoEscalaFormService: ServicoEscalaFormService,
    private router: Router,
    private modalCOnfirm: ModalConfirmacaoService) { }

  ngOnInit(): void {

    this.servicoEscalaFormService.emitirServico.subscribe(result => this.list(result.id));
    this.escalaService.eventoSalvarEscala.subscribe(this.refresh);
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
        switchMap((result) =>
          result ? this.escalaService.remove(id) : EMPTY
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
  list(id: number): void {
    this.loading = true;
    this.escalaService.listarPorServico(id).subscribe((dados) => {
      this.lista = dados;
      this.collectionSize = this.lista.length;
      this.loading = false;
      this.refresh();
      if (this.lista.length > 0) { this.listempy = false; }
      // this.lista = this.usuarios;
    }),
      (error) => {
        console.log(error);
      };
  }
  refresh(): void {
    this.escalas = this.lista
      .map((usuario, i) => ({ ...usuario }))
      .slice(
        (this.page - 1) * this.pageSize,
        (this.page - 1) * this.pageSize + this.pageSize
      );
  }

}
