import { switchMap, take } from 'rxjs/operators';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Injectable } from '@angular/core';
import { ModalLoginComponent } from './modal-login/modal-login.component';
import { Router } from '@angular/router';
import { EMPTY } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalLoginService {
  constructor(private modalservice: BsModalService, private router: Router) {}

  open(url?: string) {
    const urlDestibo = url;
    const bsModalRef: BsModalRef = this.modalservice.show(ModalLoginComponent);

    return (bsModalRef.content as ModalLoginComponent).confirmResult;
  }
}
