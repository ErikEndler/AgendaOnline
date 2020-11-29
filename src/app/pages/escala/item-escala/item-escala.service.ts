import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ItemEscala } from 'src/app/models/itemEscala';
import { CrudService } from 'src/app/shared/crud-service';

@Injectable({
  providedIn: 'root',
})
export class ItemEscalaService extends CrudService<ItemEscala> {
  eventoSalvarItemEscala = new EventEmitter();

  constructor(protected http: HttpClient) {
    super(http, 'http://localhost:8080/api/itemescala');
  }
  salvarItemEscala(): void {
    this.eventoSalvarItemEscala.emit(true);
  }

  listarPorEscala(id): Observable<Array<ItemEscala>> {
    return this.http
      .get<Array<ItemEscala>>(
        'http://localhost:8080/api/itemescala/escala/' + id
      )
      .pipe(delay(200));
  }
}
