import { Escala } from './../../../models/escala';
import { CrudService } from '../../../shared/crud-service';
import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EscalaService extends CrudService<Escala> {
  eventoSalvarEscala = new EventEmitter();
  eventoEscalaSelecionada = new EventEmitter();
  eventoEscalaAvancar = new EventEmitter();

  constructor(protected http: HttpClient) {
    super(http, 'http://localhost:8080/api/escala');
  }
  salvarEscala(): void {
    this.eventoSalvarEscala.emit(true);
  }
  selecionarEscala(): void {
    this.eventoEscalaSelecionada.emit(true);
  }
  avancarEtapa(escala: Escala): void {
    this.eventoEscalaAvancar.emit(escala);
  }
  listaDayWeek(): Observable<Array<string>> {
    return this.http
      .get<Array<string>>('http://localhost:8080/api/escala/dayweek')
      .pipe(delay(200));
  }
  listarPorServico(id): Observable<Array<Escala>> {
    return this.http
      .get<Array<Escala>>('http://localhost:8080/api/escala/servico/' + id)
      .pipe(delay(200));
  }
}
