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
    private atendimentoService: AtendimentoService
  ) {}
  formulario: FormGroup;
  @Input() nota: number;
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
    this.loadFormulario();
  }
  loadFormulario(): void {
    this.formulario = this.formBuilder.group({
      id: [this.avaliacao.id],
      atendimento: [this.avaliacao.atendimento],
      notaCLiente: [this.avaliacao.notaCLiente],
      notaFuncionario: [this.avaliacao.notaFuncionario],
      obsCliente: [this.avaliacao.obsCliente],
      obsuncionario: [this.avaliacao.obsuncionario],
    });
  }
  click(): void {
    this.avaliacao.atendimento = this.atendimento;
    //this.loadFormulario();
    console.log('func: ', this.funcionario);
    console.log('edit: ', this.edit);
    console.log(this.formulario.value);
  }
  onClose(): void {
    this.confirmResult.next(false);
    this.bsModalRef.hide();
  }
  onConfirme(): void {
    this.confirmResult.next(this.formulario.value);
    this.atendimentoService.save(this.formulario.value).subscribe(
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
