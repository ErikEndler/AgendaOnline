import { Servico } from './../../../../models/servico';
import { ErroService } from './../../../../shared/erro/erro.service';
import { ServicoEscalaFormService } from './../../servico-escala-form.service';
import { EscalaService } from './../escala.service';
import { Escala } from './../../../../models/escala';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { switchMap, take } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { ModalConfirmacaoService } from 'src/app/shared/modal-confirmacao/modal-confirmacao.service';

@Component({
  selector: 'app-escala-list',
  templateUrl: './escala-list.component.html',
  styleUrls: ['./escala-list.component.css'],
})
export class EscalaListComponent implements OnInit {
  loading = true;
  listempy = true;
  page = 1;
  pageSize = 4;
  collectionSize: any;
  escalas: Escala[];
  colunas: string[] = ['select', 'dia semana'];
  lista: Escala[];
  servicoID: Servico;
  escala: Escala;
  selecionadoEtapa2 = false;
  diasSemana: string[];
  novalista: Escala[];

  constructor(
    private escalaService: EscalaService,
    private servicoEscalaFormService: ServicoEscalaFormService,
    private router: Router,
    private modalCOnfirm: ModalConfirmacaoService,
    private erroService: ErroService
  ) {}

  ngOnInit(): void {
    this.servicoEscalaFormService.emitirServico.subscribe((result) => {
      this.list(result?.id), (this.servicoID = result);
    });
    this.escalaService.eventoSalvarEscala.subscribe(
      (result) => result === true && this.list(this.servicoID.id)
    );
  }
  onEdit(id): void {
    // this.router.navigate(['servicoEditar', id]);
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
        switchMap((result) => (result ? this.escalaService.remove(id) : EMPTY))
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
  list(id: number): void {
    this.loading = true;
    this.escalaService.listaDayWeek().subscribe((result) => {
      this.diasSemana = result;
    });
    this.escalaService.listarPorServico(id).subscribe(
      (dados) => {
        this.lista = dados;
        this.collectionSize = this.lista.length;
        this.loading = false;

        if (this.lista.length > 0) {
          this.listempy = false;
        } else {
          this.listempy = true;
        }

        this.refresh();
      },
      (error) => {
        console.error(error);
        this.erroService.tratarErro(error);
      }
    );
  }

  refresh(): void {
    this.escalas = this.lista
      .map((usuario, i) => ({ ...usuario }))
      .slice(
        (this.page - 1) * this.pageSize,
        (this.page - 1) * this.pageSize + this.pageSize
      );
  }
  onselect(variavel: Escala): void {
    this.escala = variavel;
    this.escalaService.selecionarEscala();
    this.selecionadoEtapa2 = true;
  }
  nextEtapa2(): void {
    this.escalaService.avancarEtapa(this.escala);
  }
  voltar(): void {
    this.selecionadoEtapa2 = false;
  }
}
