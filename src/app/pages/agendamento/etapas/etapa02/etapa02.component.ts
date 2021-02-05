import { EtapasService } from './../etapas.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ServicoFuncionario } from 'src/app/models/servico-funcionario';
import { ServicoFuncionarioService } from 'src/app/pages/servico-funcionario/servico-funcionario.service';
import { ErroService } from 'src/app/shared/erro/erro.service';
import { EscalaService } from 'src/app/pages/escala/escala.service';
import { Escala } from 'src/app/models/escala';

@Component({
  selector: 'app-etapa02',
  templateUrl: './etapa02.component.html',
  styleUrls: ['./etapa02.component.css'],
})
export class Etapa02Component implements OnInit {
  servicosFuncionario: ServicoFuncionario[];
  listaServicosFuncionario: ServicoFuncionario[];
  listempy = true;
  page = 1;
  pageSize = 4;
  collectionSize: any;
  loading1 = false;
  colunas: string[] = ['Serviço', 'Funcionário', 'select'];
  idServico: number;
  escalas$: Observable<Escala[]>;
  count: number;

  constructor(
    private servicoFuncionarioService: ServicoFuncionarioService,
    private erroService: ErroService,
    private escalaService: EscalaService,
    private etapasService: EtapasService
  ) {}

  ngOnInit(): void {
    this.etapasService.eventoServico.subscribe((result) => {
      this.idServico = result;
      this.list();
    });
  }
  list(): void {
    this.listaServicosFuncionario = null;

    this.loading1 = true;
    this.servicoFuncionarioService
      .listarFuncionariosDoServico(this.idServico)
      .subscribe(
        (sucess) => {
          this.collectionSize = sucess.length;
          this.listaServicosFuncionario = sucess;
          this.loading1 = false;
          if (sucess.length > 0) {
            this.listempy = false;
          }
          this.refresh();
        },
        (error) => {
          console.error(error);
          this.erroService.tratarErro(error);
          this.loading1 = false;
        }
      );
  }
  refresh(): void {
    this.servicosFuncionario = this.listaServicosFuncionario
      .map((servico, i) => ({ ...servico }))
      .slice(
        (this.page - 1) * this.pageSize,
        (this.page - 1) * this.pageSize + this.pageSize
      );
  }
  avancar(servicoFuncionario): void {
    this.etapasService.emiteServicoFuncionario(servicoFuncionario);
  }
  buscaEscala(servicoFuncionario: ServicoFuncionario) {
    if (servicoFuncionario) {
      this.escalaService
        .listarPorServicoFuncionario(servicoFuncionario.id)
        .subscribe(
          (result) => {
            if (result[0].itensEscala.length > 0) {
            }
            result[0];
            result.forEach((e) => {
              if (e.itensEscala.length > 0) {
                return true;
              }
              return false;
            });
          },
          (error) => {
            console.error(error);
            this.erroService.tratarErro(error);
            return false;
          }
        );
    }
    return false;
  }
}
