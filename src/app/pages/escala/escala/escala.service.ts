import { Escala } from '../../../models/escala';
import { CrudService } from '../../../shared/crud-service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EscalaService extends CrudService<Escala> {
  constructor(protected http: HttpClient) {
    super(http, 'http://localhost:8080/api/escala');
  }
  listaDayWeek(): Observable<Array<string>> {
    return this.http.get<Array<string>>('http://localhost:8080/api/escala/dayweek').pipe(delay(2000));
  }
}
