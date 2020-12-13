import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ItemEscala } from 'src/app/models/itemEscala';
import { ItemEscalaFormComponent } from './item-escala-form.component';

@Injectable({
  providedIn: 'root',
})
export class ItemEscalaFormService {
  constructor(private modalservice: BsModalService) {}

  openItemEscalaForm(idEscala: number, itemEscala?: ItemEscala) {
    let bsModalRef: BsModalRef;
    bsModalRef = this.modalservice.show(ItemEscalaFormComponent);
    bsModalRef.content.escalaId = idEscala;
    if (itemEscala) {
      bsModalRef.content.itemEscala = itemEscala;
    } else {
      bsModalRef.content.itemEscala = new ItemEscala();
    }

    return (bsModalRef.content as ItemEscalaFormComponent).confirmResult;
  }
}
