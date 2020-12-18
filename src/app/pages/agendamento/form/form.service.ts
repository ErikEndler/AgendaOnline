import { Agendamento } from './../../../models/agendamento';
import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { AgendamentoFormComponent } from './agendamento-form.component';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

// https://typescript.hotexamples.com/pt/examples/ngx-bootstrap.modal/BsModalService/-/typescript-bsmodalservice-class-examples.html
export class FormService {
  constructor(private modalservice: BsModalService) { }
  openFormulario(idFuncionario, agendamento?: Agendamento): Subject<any> {
    let initialState: { funcionarioID: number; agendamento?: Agendamento; };
    if (agendamento) {
      initialState = {
        funcionarioID: idFuncionario,
        agendamento
      };
    } else {
      initialState = {
        funcionarioID: idFuncionario,
        agendamento: new Agendamento()
      };
    }
    const config: ModalOptions = {
      backdrop: 'static',
      initialState
    };
    const bsModalRef: BsModalRef = this.modalservice.show(AgendamentoFormComponent, config);


    return (bsModalRef.content as AgendamentoFormComponent).confirmResult;
  }
}
