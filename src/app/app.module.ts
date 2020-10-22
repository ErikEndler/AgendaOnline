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
import { UsuarioListComponent } from './pages/usuario/list/usuario-list/usuario-list.component';
import { ModalConfirmacaoComponent } from './shared/modal-confirmacao/modal-confirmacao.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ModalLoginComponent } from './shared/modal-login/modal-login/modal-login.component';
import { HomeComponent } from './pages/home/home/home.component';
import { CategoriaComponent } from './pages/categoria/form/categoria/categoria.component';
import { CategoriaListComponent } from './pages/categoria/list/categoria-list/categoria-list.component';
import { ServicoListComponent } from './pages/servico/list/servico-list/servico-list.component';
import { ServicoComponent } from './pages/servico/form/servico/servico.component';
import { CadastroComponent } from './pages/usuario/cadastro/cadastro/cadastro.component';
import { EscalaComponent } from './pages/escala/escala-form/escala/escala.component';

@NgModule({
  declarations: [
    AppComponent,
    UsuarioComponent,
    UsuarioListComponent,
    ModalConfirmacaoComponent,
    ModalLoginComponent,
    HomeComponent,
    CategoriaComponent,
    CategoriaListComponent,
    ServicoListComponent,
    ServicoComponent,
    CadastroComponent,
    EscalaComponent,
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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
