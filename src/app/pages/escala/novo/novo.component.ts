import { UsuarioService } from './../../usuario/usuario.service';
import { async } from '@angular/core/testing';
import { delay } from 'rxjs/operators';
import { ServicoFuncionario } from './../../../models/servico-funcionario';
import { Component, Input, OnInit } from '@angular/core';
import { ItemEscala } from 'src/app/models/itemEscala';
import { Servico } from 'src/app/models/servico';
import { ServicoEscalaFormService } from '../servico-escala-form.service';
import { Escala } from 'src/app/models/escala';
import { ErroService } from 'src/app/shared/erro/erro.service';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { EscalaService } from '../escala.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-novo',
  templateUrl: './novo.component.html',
  styleUrls: ['./novo.component.css'],
})
export class NovoComponent implements OnInit {
  diasSemana: string[] = [];
  loading = true;
  empy = true;
  servicoFuncionarioId: number;
  escalas$: Observable<Escala[][]>;
  escala: Escala;
  lista: any[];
  servicos: Servico[];
  funcionarioId: number;
  servicosIds: number[];
  @Input() funcionario: Usuario;

  constructor(
    private servicoEscalaFormService: ServicoEscalaFormService,
    private erroService: ErroService,
    private escalaService: EscalaService,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    this.servicoEscalaFormService.emitirServicos.subscribe(
      (result: Servico[]) => {
        this.servicos = result;
        this.listEscalas();
      }
    );
    this.escalaService
      .listaDayWeek()
      .subscribe((result) => (this.diasSemana = result));
  }
  getFuncionario(id: number): void {
    this.usuarioService
      .loadByID(id)
      .subscribe((result) => (this.funcionario = result));
  }
  listEscalas(dados?: Servico[]): void {
    this.loading = true;
    this.servicosIds = this.servicos.map((item) => item.id);
    this.escalas$ = this.servicoEscalaFormService.teste(
      this.funcionario.id,
      this.servicosIds
    );
    this.escalas$.subscribe(
      (result) => {
        console.log('result ===', result);

        if (result.length > 0) {
          this.empy = false;
        }
        this.loading = false;
      },
      (error) => {
        console.error(error);
        this.erroService.tratarErro(error);
      }
    );
  }
  retornaServico(idServico: number): string {
    console.log('idServico - ', idServico);
    let serv: Servico;
    serv = this.servicos.find((e) => (e.id = idServico));
    return serv.nome;
  }
}
