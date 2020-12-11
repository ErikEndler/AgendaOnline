import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ItemEscala } from 'src/app/models/itemEscala';
import { AppSettings } from 'src/app/shared/appSettings';
import { CrudService } from 'src/app/shared/crud-service';
import { ItemEscalaFormComponent } from './item-escala-form/item-escala-form.component';

@Injectable({
  providedIn: 'root',
})
export class ItemEscalaService extends CrudService<ItemEscala> {
  eventoSalvarItemEscala = new EventEmitter();

  constructor(protected http: HttpClient, private modalservice: BsModalService) {
    super(http, AppSettings.url + '/api/itemescala');
  }
  salvarItemEscala(): void {
    this.eventoSalvarItemEscala.emit(true);
  }

  listarPorEscala(id): Observable<Array<ItemEscala>> {
    return this.http
      .get<Array<ItemEscala>>(AppSettings.url +
        '/api/itemescala/escala/' + id
      )
      .pipe(delay(200));
  }

  openItemEscala(itemEscala: ItemEscala) {
    const bsModalRef: BsModalRef = this.modalservice.show(ItemEscalaFormComponent);
    bsModalRef.content.itemEscala = itemEscala;

  }
}
