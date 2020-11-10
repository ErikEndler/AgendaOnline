import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Servico } from 'src/app/models/servico';
import { ServicoService } from '../../servico/servico.service';

@Component({
  selector: 'app-servico-escala-form',
  templateUrl: './servico-escala-form.component.html',
  styleUrls: ['./servico-escala-form.component.css'],
})
export class ServicoEscalaFormComponent implements OnInit {
  constructor(
    private serviceServico: ServicoService,
    private formBuilder: FormBuilder
  ) {}

  @Output() eventoServico = new EventEmitter();

  servicoID;
  servicos: Servico[];
  listaServico: Servico[];
  page = 1;
  pageSize = 4;
  collectionSize: any;
  loading = true;
  colunas: string[] = ['select', 'nome', 'descrição'];
  formulario: FormGroup;

  ngOnInit(): void {
    this.list();
  }
  list(): void {
    this.loading = true;
    this.serviceServico.list().subscribe((dados) => {
      this.listaServico = dados;
      this.collectionSize = this.listaServico.length;
      this.loading = false;
      this.refreshListServico();
    }),
      (error) => {};
  }
  refreshListServico(): void {
    this.servicos = this.listaServico
      .map((servico, i) => ({ ...servico }))
      .slice(
        (this.page - 1) * this.pageSize,
        (this.page - 1) * this.pageSize + this.pageSize
      );
  }

  funcao() {
    console.log('evento servico id : ', this.servicoID);
    this.eventoServico.emit(this.servicoID);
    // this.eventoServico.emit('servicooooo');
  }
}
