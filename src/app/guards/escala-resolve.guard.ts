import { Escala } from './../models/escala';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Resolve,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { EscalaService } from '../pages/escala/escala.service';

@Injectable({
  providedIn: 'root',
})
export class EscalaResolveGuard implements Resolve<Escala> {
  constructor(private serviceEscala: EscalaService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Escala> {
    if (route.params && route.params.id) {
      return this.serviceEscala.loadByID(route.params.id);
    }
    return of({
      id: null,
      diaSemana: null,
      servicoFuncionario: null,
      itensEscala: null,
    });
  }
}
