import { delay } from 'rxjs/operators';
import { AgendamentoService } from './agendamento.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Agendamento } from 'src/app/models/agendamento';
import { ErroService } from 'src/app/shared/erro/erro.service';

@Component({
  selector: 'app-agendamento',
  templateUrl: './agendamento.component.html',
  styleUrls: ['./agendamento.component.css'],
})
export class AgendamentoComponent implements OnInit {
  empy = true;
  funcionarioID: number;
  loading = false;
  colunas: string[] = [];
  agendamentos$: Observable<Agendamento[][]>;

  constructor(
    private agendamentoService: AgendamentoService,
    private erroService: ErroService
  ) {}

  ngOnInit(): void {
    this.funcionarioID = parseInt(sessionStorage.getItem('id'), 10);
  }
  agendaDia(data?): void {
    this.loading = true;
    const dia: string[] = [];
    dia.push(data);
    this.agendamentos$ = this.agendamentoService.listaAgendamentosData(
      dia,
      this.funcionarioID
    );
    this.agendamentos$.pipe(delay(400)).subscribe(
      (sucess) => {
        console.log(sucess);
        if (sucess.indexOf(Agendamento[0]) !== -1) {
          console.log('setou empy com false');
          this.empy = false;
        }
        this.colunas.push('Hoje');
        this.loading = false;
      },
      (error) => {
        console.error(error);
        this.erroService.tratarErro(error);
        this.loading = false;
      }
    );
  }
  adicionarAgendamento() {}
}
