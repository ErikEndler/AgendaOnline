import { AgendamentoService } from './../agendamento.service';
import { Agendamento } from './../../../models/agendamento';
import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/auth/token.service';
import { LoginReturn } from 'src/app/models/loginReturn';
import { ErroService } from 'src/app/shared/erro/erro.service';

@Component({
  selector: 'app-agendamento-cliente',
  templateUrl: './agendamento-cliente.component.html',
  styleUrls: ['./agendamento-cliente.component.css'],
})
export class AgendamentoClienteComponent implements OnInit {
  constructor(
    private agendamentoService: AgendamentoService,
    private tokenService: TokenService,
    private erroService: ErroService
  ) {}
  listaAgendamento: Agendamento[];
  agendamentos: Agendamento[];
  empy = false;
  userLogin: LoginReturn;
  loading = false;
  page = 1;
  pageSize = 4;
  collectionSize: any;

  ngOnInit(): void {
    this.userLogin = this.tokenService.decodePayloadJWT();
    this.list();
  }
  list(): void {
    this.loading = true;
    this.agendamentoService.agendamentoCliente(this.userLogin.id).subscribe(
      (result) => {
        if (result.length) {
          console.log('entrou no lengt >0');
          this.listaAgendamento = result;
          this.collectionSize = this.listaAgendamento.length;
          this.loading = false;
          this.refresh();
        } else {
          console.log('else do lengt >0');
          this.empy = true;
        }
      },
      (error) => {
        console.error(error);
        this.erroService.tratarErro(error);
        this.loading = false;
      }
    );
  }
  refresh(): void {
    this.agendamentos = this.listaAgendamento
      .map((obj, i) => ({ ...obj }))
      .slice(
        (this.page - 1) * this.pageSize,
        (this.page - 1) * this.pageSize + this.pageSize
      );
  }
  trimData(agendamento: Agendamento): string {
    return agendamento.horarioInicio.slice(0, 10);
  }
  trimHora(agendamento: Agendamento): string {
    return agendamento.horarioInicio.slice(-5);
  }
}
