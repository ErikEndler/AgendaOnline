import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Agendamento } from '../models/agendamento';
import { AgendamentoService } from '../pages/agendamento/agendamento.service';

@Injectable({
  providedIn: 'root'
})
export class AgendamentoResolveGuard implements Resolve<Agendamento> {
  constructor(private service: AgendamentoService) { }
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):
    Observable<Agendamento> {
    if (route.params && route.params.id) {
      return this.service.loadByID(route.params.id);
    }
    return of(new Agendamento());
  }
}
