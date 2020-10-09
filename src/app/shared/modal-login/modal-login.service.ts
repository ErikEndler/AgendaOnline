import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Injectable } from '@angular/core';
import { ModalLoginComponent } from './modal-login/modal-login.component';

@Injectable({
  providedIn: 'root',
})
export class ModalLoginService {
  constructor(private modalservice: BsModalService) {}

  open(url?: string): void {
    const urlDestibo = url;
    const bsModalRef: BsModalRef = this.modalservice.show(ModalLoginComponent);
    const result = (bsModalRef.content as ModalLoginComponent).confirmResult;
  }
}
