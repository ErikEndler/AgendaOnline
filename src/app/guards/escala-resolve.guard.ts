import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/pages/usuario/usuario.service';
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
export class EscalaResolveGuard implements Resolve<Usuario> {
  constructor(
    private serviceEscala: EscalaService,
    private usuarioService: UsuarioService
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Usuario> {
    if (route.params && route.params.id) {
      return this.usuarioService.loadByID(route.params.id);
    }
    return of(new Usuario());
  }
}
