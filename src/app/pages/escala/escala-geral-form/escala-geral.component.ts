import { UsuarioService } from './../../usuario/usuario.service';
import { Usuario } from 'src/app/models/usuario';
import { ServicoFuncionarioService } from './../../servico-funcionario/servico-funcionario.service';
import { Servico } from 'src/app/models/servico';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicoService } from '../../servico/servico.service';
import { ErroService } from 'src/app/shared/erro/erro.service';

@Component({
  selector: 'app-escala-geral',
  templateUrl: './escala-geral.component.html',
  styleUrls: ['./escala-geral.component.css'],
})
export class EscalageralComponent implements OnInit {
  iniciar = true;
  visible = true;
  loading = false;
  page = 1;
  pageSize = 4;
  collectionSize: any;
  servicos: Servico[];
  colunas: string[] = ['select', 'nome', 'descrição'];
  formulario: FormGroup;
  listaServico: Servico[];
  selecionadoRtapa2 = false;
  funcionario: Usuario;

  constructor(
    private serviceServico: ServicoService,
    private activatedRoute: ActivatedRoute,
    private usuarioService: UsuarioService,
    private erroService: ErroService
  ) {}

  ngOnInit(): void {
    this.funcionario = this.activatedRoute.snapshot.data.usuario;

    // this.activatedRoute.queryParams.subscribe((params) => {
    //  console.log(params); // { order: "popular" }
    //  this.usuarioService
    //    .loadByID(params.id)
    //    .subscribe((result) => (this.funcionario = result));
    // });

    // this.list();
    // const escala = this.route.snapshot.data['escala'];
    // this.formulario = this.formBuilder.group({id: [escala.id],servico: [escala.servico],diaSemana: [escala.diaSemana],});
  }
  list(): void {
    this.loading = true;
    this.serviceServico.list().subscribe(
      (dados) => {
        this.listaServico = dados;
        this.collectionSize = this.listaServico.length;
        this.loading = false;
        this.refreshListServico();
      },
      (error) => {
        console.error(error);
        this.erroService.tratarErro(error);
      }
    );
  }
  refreshListServico(): void {
    this.servicos = this.listaServico
      .map((servico, i) => ({ ...servico }))
      .slice(
        (this.page - 1) * this.pageSize,
        (this.page - 1) * this.pageSize + this.pageSize
      );
  }
  onSelect(): void {}

  changeVisible(evento): void {
    console.log('consolelog do evento : ' + evento);
    this.visible = evento;
  }

  finishFunction(): void {}
  voltarPagina(): void {
    window.history.back();
  }
}
