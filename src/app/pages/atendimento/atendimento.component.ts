import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/auth/token.service';
import { LoginReturn } from 'src/app/models/loginReturn';

@Component({
  selector: 'app-atendimento',
  templateUrl: './atendimento.component.html',
  styleUrls: ['./atendimento.component.css']
})
export class AtendimentoComponent implements OnInit {

  constructor(private tokenService: TokenService, private router: Router) { }
  loginReturn: LoginReturn;


  ngOnInit(): void {
    this.loginReturn = this.tokenService.decodePayloadJWT();

  }

}
