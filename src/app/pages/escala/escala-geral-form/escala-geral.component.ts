import { EscalaService } from './../escala/escala.service';
import { Servico } from 'src/app/models/servico';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ServicoService } from '../../servico/servico.service';

@Component({
  selector: 'app-escala-geral',
  templateUrl: './escala-geral.component.html',
  styleUrls: ['./escala-geral.component.css'],
})
export class EscalageralComponent implements OnInit {
  iniciar = true;
  visible = false;
  loading = false;
  page = 1;
  pageSize = 4;
  collectionSize: any;
  servicos: Servico[];
  colunas: string[] = ['select', 'nome', 'descrição'];
  formulario: FormGroup;
  listaServico: Servico[];
  selecionadoRtapa2 = false;

  constructor(
    private serviceServico: ServicoService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private escalaService: EscalaService
  ) {}

  ngOnInit(): void {
    this.escalaService.eventoEscalaSelecionada.subscribe(
      (result) => (this.selecionadoRtapa2 = result)
    );
    this.list();
    const escala = this.route.snapshot.data['escala'];
    this.formulario = this.formBuilder.group({
      id: [escala.id],
      servico: [escala.servico],
      diaSemana: [escala.diaSemana],
    });
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
      (error) => {}
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
  nextEtapa2() {}

  finishFunction(): void {}
}
