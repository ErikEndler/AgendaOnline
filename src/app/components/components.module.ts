import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FormDebugComponent } from './form-debug/form-debug.component';
import { CampoControlErroComponent } from './form/campo-control-erro/campo-control-erro.component';
@NgModule({
  imports: [CommonModule, RouterModule, NgbModule],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    FormDebugComponent,
    CampoControlErroComponent,
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    FormDebugComponent,
    CampoControlErroComponent
  ],
})
export class ComponentsModule {}
