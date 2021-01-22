import { RatingComponent } from './rating.component';
import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  constructor(private modalservice: BsModalService) { }
  showConfirm(title: string, msg: string, okTxt?: string, cancelText?: string) {
    const config: ModalOptions = {
      class: 'modal-dialog',
    };
    const bsModalRef: BsModalRef = this.modalservice.show(
      RatingComponent,
      config
    );
    bsModalRef.content.title = title;
    bsModalRef.content.msg = msg;
    if (okTxt) {
      bsModalRef.content.okTxt = okTxt;
    }
    if (cancelText) {
      bsModalRef.content.cancelText = cancelText;
    }
    return (bsModalRef.content as RatingComponent).confirmResult;
  }
}
