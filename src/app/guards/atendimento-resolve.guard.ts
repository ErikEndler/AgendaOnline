import { AtendimentoService } from './../pages/atendimento/atendimento.service';
import { Atendimento } from 'src/app/models/atendimento';
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Resolve,
} from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AtendimentoResolveGuard implements Resolve<Atendimento> {
  constructor(private service: AtendimentoService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Atendimento> {
    if (route.params && route.params.id) {
      return this.service.loadByID(route.params.id);
    }
    return of(new Atendimento());
  }
}
