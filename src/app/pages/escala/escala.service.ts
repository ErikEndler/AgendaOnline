import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Escala } from 'src/app/models/escala';
import { AppSettings } from 'src/app/shared/appSettings';
import { CrudService } from 'src/app/shared/crud-service';

@Injectable({
  providedIn: 'root',
})
export class EscalaService extends CrudService<Escala> {
  constructor(protected http: HttpClient) {
    super(http, AppSettings.url + '/api/escala');
  }

  listaDayWeek(): Observable<Array<string>> {
    return this.http
      .get<Array<string>>(AppSettings.url + '/api/escala/dayweek')
      .pipe(delay(200));
  }
  listarPorServico(id): Observable<Array<Escala>> {
    return this.http
      .get<Array<Escala>>(AppSettings.url + '/api/escala/servico/' + id)
      .pipe(delay(200));
  }
}
