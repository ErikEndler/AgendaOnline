import { AgendamentoViewComponent } from './pages/agendamento/agendamento-view/agendamento-view.component';
import { UsuarioHomeComponent } from './pages/usuario/usuario-home.component';
import { CategoriaListComponent } from './pages/categoria/list/categoria-list/categoria-list.component';
import { CategoriaComponent } from './pages/categoria/form/categoria/categoria.component';
import { ItemEscalaFormComponent } from './pages/escala/item-escala/item-escala-form/item-escala-form.component';
import { ServicoEscalaFormComponent } from './pages/escala/servico-escala-form/servico-escala-form.component';
import { EscalageralComponent } from './pages/escala/escala-geral-form/escala-geral.component';
import { InterceptorModule } from './auth/interceptor/interceptor.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UsuarioComponent } from './pages/usuario/form/usuario.component';
import { ComponentsModule } from './components/components.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { ReactiveFormsModule } from '@angular/forms';
import { UsuarioListComponent } from './pages/usuario/list/usuario-list.component';
import { ModalConfirmacaoComponent } from './shared/modal-confirmacao/modal-confirmacao.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ModalLoginComponent } from './shared/modal-login/modal-login/modal-login.component';
import { HomeComponent } from './pages/home/home/home.component';
import { ServicoListComponent } from './pages/servico/list/servico-list.component';
import { ServicoFormComponent } from './pages/servico/form/servico-form.component';
import { CadastroComponent } from './pages/usuario/cadastro/cadastro.component';
import { ArchwizardModule } from 'angular-archwizard';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { NotificacaoComponent } from './shared/notificacao/notificacao/notificacao.component';
import { HomeEscalaComponent } from './pages/escala/home-escala/home-escala.component';
import { ItemEscalaListComponent } from './pages/escala/item-escala/item-escala-list/item-escala-list.component';
import { ServicoFuncionarioComponent } from './pages/servico-funcionario/geral/servico-funcionario.component';
import { FuncionarioviewComponent } from './pages/servico-funcionario/funcionario-view/funcionarioview.component';
import { NovoComponent } from './pages/escala/novo/novo.component';
import { CampoControlErroComponent } from './shared/campo-control-erro/campo-control-erro.component';
import { FormDebugComponent } from './shared/form-debug/form-debug.component';
import { AgendamentoFormComponent } from './pages/agendamento/agendamento-form/agendamento-form.component';
import { ServicoComponent } from './pages/servico/servico.component';
import { AgendamentoHomeComponent } from './pages/agendamento/agendamento-home/agendamento-home.component';
import { Etapa01Component } from './pages/agendamento/etapas/etapa01/etapa01.component';
import { Etapa02Component } from './pages/agendamento/etapas/etapa02/etapa02.component';
import { Etapa03Component } from './pages/agendamento/etapas/etapa03/etapa03.component';
import { Etapa04Component } from './pages/agendamento/etapas/etapa04/etapa04.component';
import { AgendamentoClienteComponent } from './pages/agendamento/cliente/agendamento-cliente.component';
import { AgendamentoComponent } from './pages/agendamento/agendamento.component';
import { Etapa00Component } from './pages/agendamento/etapas/etapa00/etapa00.component';
import { AtendimentoComponent } from './pages/atendimento/atendimento.component';
import { AgendamentoStatusComponent } from './pages/agendamento/agendamento-status/agendamento-status.component';
import { MeusAtendimentosComponent } from './pages/atendimento/meus-atendimentos/meus-atendimentos.component';
import { ListarComponent } from './pages/atendimento/atender/atender-listar/listar.component';
import { FormComponent } from './pages/atendimento/atender/atender-form/form.component';
import { RecuperarSenhaComponent } from './pages/usuario/recuperar-senha/recuperar-senha.component';
import { ModalAvaliacaoComponent } from './pages/avaliacao/modal-avaliacao/modal-avaliacao.component';
import { RatingComponent } from './shared/rating/rating.component';

@NgModule({
  declarations: [
    AppComponent,
    UsuarioComponent,
    UsuarioListComponent,
    ModalConfirmacaoComponent,
    ModalLoginComponent,
    HomeComponent,
    ServicoListComponent,
    ServicoFormComponent,
    CadastroComponent,
    EscalageralComponent,
    NotificacaoComponent,
    HomeEscalaComponent,
    ServicoEscalaFormComponent,
    ItemEscalaListComponent,
    ItemEscalaFormComponent,
    ServicoFuncionarioComponent,
    FuncionarioviewComponent,
    NovoComponent,
    CategoriaComponent,
    CategoriaListComponent,
    CampoControlErroComponent,
    FormDebugComponent,
    AgendamentoFormComponent,
    UsuarioHomeComponent,
    ServicoComponent,
    AgendamentoHomeComponent,
    Etapa01Component,
    Etapa02Component,
    Etapa03Component,
    Etapa04Component,
    AgendamentoClienteComponent,
    AgendamentoViewComponent,
    AgendamentoComponent,
    Etapa00Component,
    AtendimentoComponent,
    AgendamentoStatusComponent,
    MeusAtendimentosComponent,
    ListarComponent,
    FormComponent,
    RecuperarSenhaComponent,
    ModalAvaliacaoComponent,
    RatingComponent,
  ],
  imports: [
    FormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    RouterModule,
    ToastrModule,
    ComponentsModule,
    CommonModule,
    NgxMaskModule.forRoot(),
    ReactiveFormsModule,
    ModalModule.forRoot(),
    InterceptorModule,
    ArchwizardModule,
    SimpleNotificationsModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
