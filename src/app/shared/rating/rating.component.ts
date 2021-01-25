import { Atendimento } from 'src/app/models/atendimento';
import { AtendimentoService } from './../../pages/atendimento/atendimento.service';
import { Avaliacao } from './../../models/avaliacao';
import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NotificacaoService } from '../notificacao/notificacao.service';
import { NotificationType } from 'angular2-notifications';
import { ErroService } from '../erro/erro.service';
import { AvaliacaoService } from 'src/app/pages/avaliacao/avaliacao.service';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css'],
})
export class RatingComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    public bsModalRef: BsModalRef,
    private notificacaoService: NotificacaoService,
    private erroService: ErroService,
    private avaliacaoService: AvaliacaoService
  ) { }
  formulario: FormGroup;
  nota: number;
  obsCliente: string;
  obsFuncionario: string;
  @Input() avaliacao: Avaliacao = new Avaliacao();
  @Input() edit = false;
  @Input() funcionario = false;
  @Input() atendimento: Atendimento;
  // @Output() respostaNota = new EventEmitter();
  confirmResult: Subject<any>;

  ngOnInit(): void {
    console.log('func: ', this.funcionario);
    console.log('edit: ', this.edit);
    this.confirmResult = new Subject();
    this.obsCliente = this.avaliacao.obsCliente;
    this.obsFuncionario = this.avaliacao.obsFuncionario;
    //this.disableCampos();
    //this.loadFormulario();
  }
  disableCampos() {
    if (!this.edit) {
      return 'disabled';
    }
  }
  loadFormulario(): void {
    this.formulario = this.formBuilder.group({
      id: [this.avaliacao?.id],
      atendimento: [this.avaliacao?.atendimento],
      notaCLiente: [this.avaliacao?.notaCLiente],
      notaFuncionario: [this.avaliacao?.notaFuncionario],
      obsCliente: [this.avaliacao?.obsCliente],
      obsFuncionario: [this.avaliacao?.obsFuncionario],
    });
  }
  click(nota: number): void {
    this.nota = nota;
    // this.formulario.get('atendimento').setValue(this.atendimento);
    console.log('func: ', this.funcionario);
    console.log('edit: ', this.edit);
    console.log('nota: ', this.nota);
    console.log(this.avaliacao);
  }
  onClose(): void {
    this.confirmResult.next(false);
    this.bsModalRef.hide();
  }
  onConfirme(): void {
    if (this.funcionario) {
      this.avaliacao.notaFuncionario = this.nota;
      this.avaliacao.obsFuncionario = this.obsFuncionario;
    } else {
      this.avaliacao.notaCLiente = this.nota;
      this.avaliacao.obsCliente = this.obsCliente;
    }
    console.log(this.avaliacao);
    this.confirmResult.next(this.avaliacao);
    this.avaliacaoService.save(this.avaliacao).subscribe(
      (result) => {
        this.notificacaoService.criar(
          NotificationType.Success,
          'Salvo com Sucesso'
        );
        console.log('Serviço salvo com sucesso!');
      },
      (error) => {
        console.error(error);
        this.erroService.tratarErro(error);
      }
    );
    this.bsModalRef.hide();
  }
}
