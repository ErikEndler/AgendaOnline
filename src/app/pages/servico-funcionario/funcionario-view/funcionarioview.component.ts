import { Router } from '@angular/router';
import { ServicoFuncionario } from './../../../models/servico-funcionario';
import { ServicoFuncionarioService } from './../servico-funcionario.service';
import { UsuarioService } from './../../usuario/usuario.service';
import { ServicoService } from './../../servico/servico.service';
import { Component, OnInit } from '@angular/core';
import { Servico } from 'src/app/models/servico';
import { Usuario } from 'src/app/models/usuario';
import { ErroService } from 'src/app/shared/erro/erro.service';
import { NotificacaoService } from 'src/app/shared/notificacao/notificacao.service';
import { NotificationType } from 'angular2-notifications';

@Component({
  selector: 'app-funcionarioview',
  templateUrl: './funcionarioview.component.html',
  styleUrls: ['./funcionarioview.component.css'],
})
export class FuncionarioviewComponent implements OnInit {
  page = 1;
  page2 = 1;
  pageSize = 4;
  pageSize2 = 4;
  collectionSize: any;
  collectionSize2: any;
  colunasServico: string[] = ['selecione', 'nome', 'categoria'];
  loading = true;
  loading2 = true;
  funcionario: Usuario;
  servico: Servico;
  servicos: Servico[];
  servicosFuncionario: Servico[];
  listempy = true;
  listempy2 = true;

  constructor(
    private servicoService: ServicoService,
    private erroService: ErroService,
    private notificacaoService: NotificacaoService,
    private servicoFuncionarioService: ServicoFuncionarioService,
    private router: Router
  ) {
    const nav = this.router.getCurrentNavigation();
    this.funcionario = nav.extras.state.usuario;
    console.log('funcionario -- ', this.funcionario);
  }

  ngOnInit(): void {
    this.list();
    this.listServicoFuncionario();
    console.log('funcionario ', this.funcionario);
  }
  list(): void {
    this.loading = true;
    this.servicoService.list().subscribe(
      (dados) => {
        this.servicos = dados;
        this.collectionSize = this.servicos.length;
        this.loading = false;
        this.refreshServico();
        if (this.servicos.length > 0) {
          this.listempy = false;
        }
        // this.lista = this.usuarios;
      },
      (error) => {
        console.error(error);
        this.erroService.tratarErro(error);
      }
    );
  }
  refreshServico(): void {
    this.servicos = this.servicos
      .map((usuario, i) => ({ ...usuario }))
      .slice(
        (this.page - 1) * this.pageSize,
        (this.page - 1) * this.pageSize + this.pageSize
      );
  }
  listServicoFuncionario(): void {
    if (this.funcionario === undefined) {
      this.servicosFuncionario = null;
    } else {
      this.loading2 = true;
      this.servicoFuncionarioService
        .listarServicosFuncionario(this.funcionario?.id)
        .subscribe(
          (dados) => {
            this.servicosFuncionario = dados;
            this.collectionSize2 = this.servicosFuncionario.length;
            this.loading2 = false;
            this.refreshServicoFuncionario();
            if (this.servicosFuncionario.length > 0) {
              this.listempy2 = false;
            }
            // this.lista = this.usuarios;
          },
          (error) => {
            console.error(error);
            this.erroService.tratarErro(error);
          }
        );
    }
  }
  refreshServicoFuncionario(): void {
    this.servicosFuncionario = this.servicosFuncionario
      .map((servicosFuncionario, i) => ({ ...servicosFuncionario }))
      .slice(
        (this.page2 - 1) * this.pageSize2,
        (this.page2 - 1) * this.pageSize2 + this.pageSize2
      );
  }
  adicionarServico(servico: Servico): void {
    console.log(servico);
    console.log(this.funcionario);
    let servicoFuncionario: ServicoFuncionario = new ServicoFuncionario();
    servicoFuncionario.servicoId = servico.id;
    servicoFuncionario.funcionarioId = this.funcionario.id;
    this.servicoFuncionarioService.save(servicoFuncionario).subscribe(
      (success) => {
        this.notificacaoService.criar(
          NotificationType.Success,
          'Adicionado com Sucesso'
        );
        console.log('Serviço Adicionado ao funcionario com sucesso!');
        this.listServicoFuncionario();
      },
      (error) => {
        console.error(error);
        this.erroService.tratarErro(error);
      }
    );
  }
  removerServico(servico: Servico): void {
    const servicoFuncionario: ServicoFuncionario = new ServicoFuncionario();
    servicoFuncionario.funcionarioId = this.funcionario.id;
    servicoFuncionario.servicoId = servico.id;
    this.servicoFuncionarioService
      .deletarServicoFUncionario(servicoFuncionario)
      .subscribe(
        (success) => {
          this.notificacaoService.criar(
            NotificationType.Success,
            'Excluido com Sucesso'
          );
          console.log('Serviço Retirado ao funcionario com sucesso!');
          this.listServicoFuncionario();
        },
        (error) => {
          console.error(error);
          this.erroService.tratarErro(error);
        }
      );
  }
}
