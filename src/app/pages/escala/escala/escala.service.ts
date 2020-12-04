import { Escala } from './../../../models/escala';
import { CrudService } from '../../../shared/crud-service';
import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AppSettings } from 'src/app/shared/appSettings';

@Injectable({
  providedIn: 'root',
})
export class EscalaService extends CrudService<Escala> {
  eventoSalvarEscala = new EventEmitter();
  eventoEscalaSelecionada = new EventEmitter();
  eventoEscalaAvancar = new EventEmitter();

  constructor(protected http: HttpClient) {
    super(http, AppSettings.url + '/api/escala');
  }
  salvarEscala(): void {
    this.eventoSalvarEscala.emit(true);
  }
  selecionarEscala(): void {
    this.eventoEscalaSelecionada.emit(true);
  }
  avancarEtapa(diasSemana: string[]): void {
    this.eventoEscalaAvancar.emit(diasSemana);
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
