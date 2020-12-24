import { ServicoComponent } from './pages/servico/servico.component';
import { UserGuard } from './guards/user.guard';
import { UsuarioHomeComponent } from './pages/usuario/usuario-home.component';
import { AgendamentoFormComponent } from './pages/agendamento/agendamento-form/agendamento-form.component';
import { AgendamentoComponent } from './pages/agendamento/agendamento.component';
import { FuncionarioviewComponent } from './pages/servico-funcionario/funcionario-view/funcionarioview.component';
import { EscalaResolveGuard } from './guards/escala-resolve.guard';
import { CadastroComponent } from './pages/usuario/cadastro/cadastro.component';
import { ServicoResolveGuard } from './guards/servico-resolve.guard';
import { ServicoFormComponent } from './pages/servico/form/servico-form.component';
import { ServicoListComponent } from './pages/servico/list/servico-list.component';
import { CategoriaResolverGuard } from './guards/categoria-resolver.guard';
import { HomeComponent } from './pages/home/home/home.component';
import { UsuarioListComponent } from './pages/usuario/list/usuario-list.component';
import { AdminGuard } from './guards/admin.guard';
import { UsuarioResolverGuard } from './guards/usuario-resolver.guard';
import { UsuarioComponent } from './pages/usuario/form/usuario.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { CategoriaComponent } from './pages/categoria/form/categoria/categoria.component';
import { CategoriaListComponent } from './pages/categoria/list/categoria-list/categoria-list.component';
import { EscalageralComponent } from './pages/escala/escala-geral-form/escala-geral.component';
import { ServicoFuncionarioComponent } from './pages/servico-funcionario/geral/servico-funcionario.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'novousuario', component: CadastroComponent },
  { path: 'home', component: HomeComponent },
  {
    path: 'sf2',
    component: ServicoFuncionarioComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'sf',
    component: FuncionarioviewComponent,
    canActivate: [AdminGuard],
  },
  { path: 'agendamento', component: AgendamentoComponent },
  { path: 'agendamento/form', component: AgendamentoFormComponent },
  {
    path: 'usuario',
    component: UsuarioHomeComponent,
    canActivate: [UserGuard],
  },

  {
    path: 'escala',
    component: EscalageralComponent,
    resolve: { escala: EscalaResolveGuard },
    canActivate: [AdminGuard],
  },
  {
    path: 'usuario/list',
    component: UsuarioListComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'usuario/cadastro',
    component: UsuarioComponent,
    resolve: { usuario: UsuarioResolverGuard },
    canActivate: [AdminGuard],
  },
  {
    path: 'funcionario/cadastro',
    component: UsuarioComponent,
    resolve: { usuario: UsuarioResolverGuard },
    canActivate: [AdminGuard],
  },
  {
    path: 'perfil/:id',
    component: UsuarioComponent,
    resolve: { usuario: UsuarioResolverGuard },
    canActivate: [UserGuard],
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
    path: 'servico/list',
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
    path: 'servico/cadastro',
    component: ServicoFormComponent,
    resolve: { servico: ServicoResolveGuard },
    canActivate: [AdminGuard],
  },
  {
    path: 'servicoEditar/:id',
    component: ServicoFormComponent,
    resolve: { servico: ServicoResolveGuard },
    canActivate: [AdminGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), BrowserModule, CommonModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
