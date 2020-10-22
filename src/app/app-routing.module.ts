import { EscalaComponent } from './pages/escala/escala-form/escala/escala.component';
import { CadastroComponent } from './pages/usuario/cadastro/cadastro/cadastro.component';
import { ServicoResolveGuard } from './guards/servico-resolve.guard';
import { ServicoComponent } from './pages/servico/form/servico/servico.component';
import { ServicoListComponent } from './pages/servico/list/servico-list/servico-list.component';
import { CategoriaResolverGuard } from './guards/categoria-resolver.guard';
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
import { CategoriaComponent } from './pages/categoria/form/categoria/categoria.component';
import { CategoriaListComponent } from './pages/categoria/list/categoria-list/categoria-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'home', component: HomeComponent },
  { path: 'escala', component: EscalaComponent },
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
    canActivate: [AdminGuard],
  },
  {
    path: 'categorialist',
    component: CategoriaListComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'categoria',
    component: CategoriaComponent,
    resolve: { categoria: CategoriaResolverGuard },
    canActivate: [AdminGuard],
  },
  {
    path: 'categoriaEditar/:id',
    component: CategoriaComponent,
    resolve: { categoria: CategoriaResolverGuard },
    canActivate: [AdminGuard],
  },
  {
    path: 'servicolist',
    component: ServicoListComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'servico',
    component: ServicoComponent,
    resolve: { servico: ServicoResolveGuard },
    canActivate: [AdminGuard],
  },
  {
    path: 'servicoEditar/:id',
    component: ServicoComponent,
    resolve: { servico: ServicoResolveGuard },
    canActivate: [AdminGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), BrowserModule, CommonModule],
  exports: [RouterModule],
})
export class AppRoutingModule { }
