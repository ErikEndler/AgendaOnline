import { ServicoService } from './../pages/servico/servico.service';
import { Servico } from './../models/servico';
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
export class ServicoResolveGuard implements Resolve<Servico> {
  constructor(private service: ServicoService) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Servico> {
    if (route.params && route.params.id) {
      return this.service.loadByID(route.params.id);
    }
    return of({
      id: null,
      categoria: null,
      nome: null,
      descricao: null,
    });
  }
}
