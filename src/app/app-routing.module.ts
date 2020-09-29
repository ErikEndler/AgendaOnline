import { ModalLoginComponent } from './shared/modal-login/modal-login/modal-login.component';
import { UsuarioListComponent } from './pages/usuario/list/usuario-list/usuario-list.component';
import { UsuarioResolverGuard } from './guards/usuario-resolver.guard';
import { UsuarioComponent } from './pages/usuario/form/usuario.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: ModalLoginComponent },
  {
    path: 'usuario',
    component: UsuarioComponent,
    resolve: { usuario: UsuarioResolverGuard },
  },
  {
    path: 'usuarioEditar/:id',
    component: UsuarioComponent,
    resolve: { usuario: UsuarioResolverGuard },
  },
  {
    path: 'list-usuario',
    component: UsuarioListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), BrowserModule, CommonModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
