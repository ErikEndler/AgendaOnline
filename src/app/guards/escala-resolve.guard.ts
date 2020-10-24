import { ItemEscala } from './../models/itemEscala';
import { Escala } from './../models/escala';
import { ItemEscalaService } from './../pages/escala/item-escala.service';
import { EscalaService } from './../pages/escala/escala.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Resolve,
} from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EscalaResolveGuard implements Resolve<Escala> {
  constructor(
    private serviceEscala: EscalaService,
    private serviceItemEscala: ItemEscalaService
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Escala> {
    if (route.params && route.params.id) {
      return this.serviceEscala.loadByID(route.params.id);
    }
    return of({
      id: null,
      servico: null,
      diaSemana: null,
    });
  }
}
