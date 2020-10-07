import { CategoriaService } from './../pages/categoria/categoria.service';
import { Categoria } from './../models/categoria';
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
export class CategoriaResolverGuard implements Resolve<Categoria> {
  constructor(private service: CategoriaService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Categoria> {
    if (route.params && route.params.id) {
      return this.service.loadByID(route.params.id);
    }
    return of({
      id: null,
      nome: null,
      descricao: null,
    });
  }
}
