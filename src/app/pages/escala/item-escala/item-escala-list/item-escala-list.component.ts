import { Servico } from './../../../../models/servico';
import { Escala } from './../../../../models/escala';
import { EscalaService } from './../../escala/escala.service';
import { ErroService } from './../../../../shared/erro/erro.service';
import { ItemEscalaService } from '../item-escala.service';
import { ItemEscala } from './../../../../models/itemEscala';
import { Component, OnInit } from '@angular/core';
import { switchMap, take } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { ModalConfirmacaoService } from 'src/app/shared/modal-confirmacao/modal-confirmacao.service';
import { ServicoEscalaFormService } from '../../servico-escala-form.service';

@Component({
  selector: 'app-item-escala-list',
  templateUrl: './item-escala-list.component.html',
  styleUrls: ['./item-escala-list.component.css'],
})
export class ItemEscalaListComponent implements OnInit {
  loading = false;
  listempy = true;
  page = 1;
  pageSize = 4;
  collectionSize: any;
  itensEscala: ItemEscala[];
  colunas: string[] = ['#', 'qtd', 'Hora Inicial', 'Hora Final'];
  lista: ItemEscala[];
  escala: Escala;
  itenEscala: ItemEscala;
  selecionadoEtapa2 = false;
  diasSemana: string[] = [];
  listaServico: Servico[];
  teste: string = '8:00 - 12:00';

  constructor(
    private itemEscalaService: ItemEscalaService,
    private modalCOnfirm: ModalConfirmacaoService,
    private erroService: ErroService,
    private escalaService: EscalaService,
    private servicoEscalaFormService: ServicoEscalaFormService
  ) { }

  ngOnInit(): void {
    // this.servicoEscalaFormService.emitirServico.subscribe((result) => {
    //   this.listaServico = result;
    //   console.log('this.listaServico', this.listaServico);
    // });
    this.escalaService.eventoEscalaAvancar.subscribe((result) => {
      this.diasSemana = result;
    });
    this.itemEscalaService.eventoSalvarItemEscala.subscribe(
      (result) => result === true && this.list(this.escala.id)
    );
  }
  onDelete(id: number): void {
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
          result ? this.itemEscalaService.remove(id) : EMPTY
        )
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
  onEdit(id: number): void { }
  list(id?: number): void {
    this.loading = true;
    this.itemEscalaService.listarPorEscala(id).subscribe(
      (dados) => {
        console.log('id : ', id);
        this.lista = dados;
        console.log('this.lista : ', this.lista);
        this.collectionSize = this.lista.length;
        this.loading = false;
        this.refresh();
        if (this.lista.length > 0) {
          this.listempy = false;
        }
      },
      (error) => {
        console.error(error);
        this.erroService.tratarErro(error);
      }
    );
  }
  refresh(): void {
    this.itensEscala = this.lista
      .map((usuario, i) => ({ ...usuario }))
      .slice(
        (this.page - 1) * this.pageSize,
        (this.page - 1) * this.pageSize + this.pageSize
      );
  }
}
