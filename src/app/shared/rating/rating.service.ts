import { Atendimento } from 'src/app/models/atendimento';
import { Avaliacao } from './../../models/avaliacao';
import { RatingComponent } from './rating.component';
import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';

@Injectable({
  providedIn: 'root',
})
export class RatingService {
  constructor(private modalservice: BsModalService) { }
  showratingStar(
    atendimento: Atendimento,
    funcionario: boolean,
    edit: boolean,
    avaliacao?: Avaliacao
  ) {
    let config: ModalOptions = null;
    if (avaliacao) {
      config = {
        class: 'modal-dialog',
        initialState: { edit, funcionario, atendimento, avaliacao }
      };
    } else {
      config = {
        class: 'modal-dialog',
        initialState: { edit, funcionario, atendimento }
      };
    }
    const bsModalRef: BsModalRef = this.modalservice.show(
      RatingComponent,
      config
    );


    // if (avaliacao) {
    //   let newAvaliacao = new Avaliacao();
    //   newAvaliacao = avaliacao;
    //   console.log('setou avaliacao: ', avaliacao);
    //   bsModalRef.content.avaliacao = newAvaliacao;
    // }
    return (bsModalRef.content as RatingComponent).confirmResult;
  }
}
