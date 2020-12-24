import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/auth/token.service';
import { LoginReturn } from 'src/app/models/loginReturn';

@Component({
  selector: 'app-servico',
  templateUrl: './servico.component.html',
  styleUrls: ['./servico.component.css'],
})
export class ServicoComponent implements OnInit {
  constructor(private tokenService: TokenService, private router: Router) {}
  loginReturn: LoginReturn;
  url: string;

  ngOnInit(): void {
    this.loginReturn = this.tokenService.decodePayloadJWT();
    this.url = 'sf?id=' + this.loginReturn.id;
    console.log('url ', this.url);
  }
  novoServico() {
    this.router.navigate(['servico/cadastro']);
  }
  listarServicos() {
    this.router.navigate(['servico/cadastro']);
  }
  meusServicos() {
    this.router.navigate(['sf'], {
      queryParams: { id: this.loginReturn.id },
    });
  }
}
