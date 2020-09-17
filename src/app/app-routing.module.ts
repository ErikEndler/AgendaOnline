import { UsuarioResolverGuard } from './guards/usuario-resolver.guard';
import { UsuarioComponent } from './pages/usuario/form/usuario.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

const routes: Routes = [
  { path: '', redirectTo: 'usuario', pathMatch: 'full' },
  {
    path: 'usuario',
    component: UsuarioComponent,
    resolve: { usuario: UsuarioResolverGuard },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), BrowserModule, CommonModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
