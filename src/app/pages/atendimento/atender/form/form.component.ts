import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Agendamento } from 'src/app/models/agendamento';
import * as moment from 'moment';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  agendamento: Agendamento;
  data: string;
  horaInicial: string;
  horaFinal: string;
  segundos = 0;
  time;
  interval;
  btn1 = 'Iniciar Atendimento';
  btn1Disabled = false;
  inicioAtendimento;
  fimAtendimento;

  constructor(private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.agendamento = this.route.snapshot.data.agendamento;
    this.loadAgendamento();

  }
  loadAgendamento(): void {
    this.data = this.agendamento.horarioInicio.slice(0, 10);
    console.log(this.data);
    this.horaFinal = this.agendamento.horarioFim.slice(-5);
    this.horaInicial = this.agendamento.horarioInicio.slice(-5);
  }
  pauseTimer(): void {
    this.btn1Disabled = false;

    clearInterval(this.interval);
  }
  startInfinito(): void {
    this.inicioAtendimento = moment().format('HH:mm');
    this.btn1 = 'continuar';
    this.btn1Disabled = true;
    this.interval = setInterval(() => {
      this.segundos++;
      this.time = moment(0, 'HH:mm:ss')
        .add(this.segundos, 's')
        .format('HH:mm:ss');
      this.fimAtendimento = moment().format('HH:mm');
    }, 1000);
  }
  clearTime(): void {
    this.segundos = 0;
    this.btn1 = 'Iniciar Atendimento';
    this.btn1Disabled = false;
  }
  finalizarAtendimento(): void {

  }
}
