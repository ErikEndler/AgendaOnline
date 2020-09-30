import { ModalLoginComponent } from './shared/modal-login/modal-login/modal-login.component';
import { HomeComponent } from './pages/home/home/home.component';
import { UserGuard } from './guards/user.guard';
import { UsuarioListComponent } from './pages/usuario/list/usuario-list/usuario-list.component';
import { AdminGuard } from './guards/admin.guard';
import { UsuarioResolverGuard } from './guards/usuario-resolver.guard';
import { UsuarioComponent } from './pages/usuario/form/usuario.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'usuariolist',
    component: UsuarioListComponent,
    canActivate: [AdminGuard],
  },

  {
    path: 'usuario',
    component: UsuarioComponent,
    resolve: { usuario: UsuarioResolverGuard },
    canActivate: [AdminGuard],
  },
  {
    path: 'usuarioEditar/:id',
    component: UsuarioComponent,
    resolve: { usuario: UsuarioResolverGuard },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), BrowserModule, CommonModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
