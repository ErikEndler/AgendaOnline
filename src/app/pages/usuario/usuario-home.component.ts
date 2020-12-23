import { LoginReturn } from './../../models/loginReturn';
import { TokenService } from './../../auth/token.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuario-home',
  templateUrl: './usuario-home.component.html',
  styleUrls: ['./usuario-home.component.css']
})
export class UsuarioHomeComponent implements OnInit {

  constructor(private tokenService: TokenService, private router: Router,
  ) { }
  loginReturn: LoginReturn;
  admin = false;

  ngOnInit(): void {
    this.loginReturn = this.tokenService.decodePayloadJWT();
    if (this.loginReturn.role === 'ROLE_ADMIN' || this.loginReturn.role === 'ROLE_FUNCIONARIO') {
      this.admin = true;
    }
  }
  perfil(): void {
    this.router.navigate(['perfil', this.loginReturn.id]);
  }
  cliente(): void {
    this.router.navigate(['usuario/cadastro']);
  }
  listar(): void {
    this.router.navigate(['usuario/list']);
  }
  funcionario(): void {
    this.router.navigate(['funcionario/cadastro']);
  }

}
