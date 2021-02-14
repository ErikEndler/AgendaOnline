import { AgendamentoClienteViewComponent } from './pages/agendamento/cliente/agendamento-cliente-view/agendamento-cliente-view.component';
import { ViewAtendimentoComponent } from './pages/atendimento/view-atendimento/view-atendimento.component';
import { AtendimentoResolveGuard } from './guards/atendimento-resolve.guard';
import { Agendamento } from './models/agendamento';
import { RecuperarSenhaComponent } from './pages/usuario/recuperar-senha/recuperar-senha.component';
import { MeusAtendimentosComponent } from './pages/atendimento/meus-atendimentos/meus-atendimentos.component';
import { AgendamentoStatusComponent } from './pages/agendamento/agendamento-status/agendamento-status.component';
import { AtendimentoComponent } from './pages/atendimento/atendimento.component';
import { AgendamentoComponent } from './pages/agendamento/agendamento.component';
import { FuncionarioGuard } from './guards/funcionario.guard';
import { AgendamentoFormResolveGuard } from './guards/agendamento-form-resolve.guard';
import { AgendamentoClienteComponent } from './pages/agendamento/cliente/agendamento-cliente.component';
import { AgendamentoHomeComponent } from './pages/agendamento/agendamento-home/agendamento-home.component';
import { ServicoComponent } from './pages/servico/servico.component';
import { UserGuard } from './guards/user.guard';
import { UsuarioHomeComponent } from './pages/usuario/usuario-home.component';
import { AgendamentoFormComponent } from './pages/agendamento/agendamento-form/agendamento-form.component';
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
import { AgendamentoViewComponent } from './pages/agendamento/agendamento-view/agendamento-view.component';
import { ListarComponent } from './pages/atendimento/atender/atender-listar/listar.component';
import { FormComponent } from './pages/atendimento/atender/atender-form/form.component';
import { AtenderResolveGuard } from './guards/atender-resolve.guard';
import { MinhasAvaliacoesComponent } from './pages/avaliacao/minhas-avaliacoes/minhas-avaliacoes.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'novousuario', component: CadastroComponent },
  { path: 'home', component: HomeComponent },
  {
    path: 'agendamento',
    component: AgendamentoComponent,
    canActivate: [UserGuard],
  },
  {
    path: 'sf2',
    component: ServicoFuncionarioComponent,
    canActivate: [FuncionarioGuard],
  },
  {
    path: 'sf',
    component: FuncionarioviewComponent,
    canActivate: [FuncionarioGuard],
  },
  {
    path: 'agendamento/novo',
    component: AgendamentoHomeComponent,
    canActivate: [UserGuard],
  },
  {
    path: 'agendamentoView',
    component: AgendamentoViewComponent,
    canActivate: [FuncionarioGuard],
  },
  {
    path: 'agendamento/form/:id',
    component: AgendamentoFormComponent,
    resolve: { agendamento: AgendamentoFormResolveGuard },
  },
  {
    path: 'agendamento/cliente/:id',
    component: AgendamentoClienteViewComponent,
    resolve: { agendamento: AgendamentoFormResolveGuard },
  },
  { path: 'meusagendamentos', component: AgendamentoClienteComponent },
  {
    path: 'atendimento',
    component: AtendimentoComponent,
    canActivate: [FuncionarioGuard],
  },
  {
    path: 'atendimento/funcionario',
    component: MeusAtendimentosComponent,
    canActivate: [FuncionarioGuard],
  },
  {
    path: 'atendimento/agendamentos',
    component: ListarComponent,
    canActivate: [FuncionarioGuard],
  },
  {
    path: 'atendimento/atender/:id',
    component: FormComponent,
    resolve: { agendamento: AtenderResolveGuard },
  },
  {
    path: 'atendimento/:id',
    component: ViewAtendimentoComponent,
    resolve: { atendimento: AtendimentoResolveGuard },
  },
  { path: 'recuperarsenha', component: RecuperarSenhaComponent },

  { path: 'agendamento/status', component: AgendamentoStatusComponent },

  {
    path: 'usuario',
    component: UsuarioHomeComponent,
    canActivate: [UserGuard],
  },
  {
    path: 'escala/:id',
    component: EscalageralComponent,
    resolve: { usuario: EscalaResolveGuard },
    canActivate: [FuncionarioGuard],
  },
  {
    path: 'usuario/list',
    component: UsuarioListComponent,
    canActivate: [FuncionarioGuard],
  },
  {
    path: 'usuario/cadastro',
    component: UsuarioComponent,
    resolve: { usuario: UsuarioResolverGuard },
    canActivate: [FuncionarioGuard],
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
    canActivate: [FuncionarioGuard],
  },
  {
    path: 'servico',
    component: ServicoComponent,
    resolve: { servico: ServicoResolveGuard },
    canActivate: [FuncionarioGuard],
  },
  {
    path: 'servico/cadastro',
    component: ServicoFormComponent,
    resolve: { servico: ServicoResolveGuard },
    canActivate: [FuncionarioGuard],
  },
  {
    path: 'servicoEditar/:id',
    component: ServicoFormComponent,
    resolve: { servico: ServicoResolveGuard },
    canActivate: [FuncionarioGuard],
  },
  {
    path: 'minhasAvaliacoes',
    component: MinhasAvaliacoesComponent,
    canActivate: [UserGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), BrowserModule, CommonModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
