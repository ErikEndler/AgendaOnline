import { Atendimento } from 'src/app/models/atendimento';
import { Avaliacao } from './../../models/avaliacao';
import { RatingComponent } from './rating.component';
import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';

@Injectable({
  providedIn: 'root',
})
export class RatingService {
  constructor(private modalservice: BsModalService) {}
  showratingStar(
    atendimento: Atendimento,
    funcionario: boolean,
    edit: boolean,
    avaliacao?: Avaliacao
  ) {
    const config: ModalOptions = {
      class: 'modal-dialog',
    };
    const bsModalRef: BsModalRef = this.modalservice.show(
      RatingComponent,
      config
    );

    bsModalRef.content.edit = edit;
    bsModalRef.content.atendimento = atendimento;

    bsModalRef.content.funcionario = funcionario;

    if (avaliacao) {
      bsModalRef.content.avaliacao = avaliacao;
    }
    return (bsModalRef.content as RatingComponent).confirmResult;
  }
}
