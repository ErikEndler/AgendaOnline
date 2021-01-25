import { Agendamento } from 'src/app/models/agendamento';
import { Atendimento } from 'src/app/models/atendimento';
import { AtendimentoService } from './../atendimento.service';
import { Component, OnInit } from '@angular/core';
import { ErroService } from 'src/app/shared/erro/erro.service';
import { TokenService } from 'src/app/auth/token.service';
import { ActivatedRoute } from '@angular/router';
import { NotificacaoService } from 'src/app/shared/notificacao/notificacao.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalConfirmacaoService } from 'src/app/shared/modal-confirmacao/modal-confirmacao.service';
import { switchMap, take } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { NotificationType } from 'angular2-notifications';
import { RatingService } from 'src/app/shared/rating/rating.service';

@Component({
  selector: 'app-view-atendimento',
  templateUrl: './view-atendimento.component.html',
  styleUrls: ['./view-atendimento.component.css'],
})
export class ViewAtendimentoComponent implements OnInit {
  constructor(
    private atendimentoService: AtendimentoService,
    private modalConfirm: ModalConfirmacaoService,
    private erroService: ErroService,
    private tokenService: TokenService,
    private route: ActivatedRoute,
    private notificacaoService: NotificacaoService,
    private formBuilder: FormBuilder,
    private ratingService: RatingService
  ) {}
  atendimento: Atendimento;
  formularioAtendimento: FormGroup;
  fimAtendimento: string;
  inicioAtendimento: string;
  data: string;

  ngOnInit(): void {
    this.atendimento = this.route.snapshot.data.atendimento;

    this.fimAtendimento = this.trimHora(this.atendimento.fim);
    this.data = this.trimData(this.atendimento.inicio);
    this.inicioAtendimento = this.trimHora(this.atendimento.inicio);
  }
  formularioCreate(): void {
    this.formularioAtendimento = this.formBuilder.group({
      id: [this.atendimento.id],
      agendamento: this.formBuilder.group({
        id: [this.atendimento.agendamento.id],
        cliente: [this.atendimento.agendamento.cliente],
        servicoFuncionario: [this.atendimento.agendamento.servicoFuncionario],
        horarioInicio: [this.atendimento.agendamento.horarioInicio],
        horarioFim: [this.atendimento.agendamento.horarioFim],
        notificacao: [this.atendimento.agendamento.notificacao],
        obs: [this.atendimento.agendamento.obs],
        status: [this.atendimento.agendamento.status],
      }),
      funcionario: [this.atendimento.funcionario],
      inicio: [this.atendimento.inicio],
      fim: [this.atendimento.fim],
      avaliacao: [this.atendimento.avaliacao],
    });
  }
  trimHora(valor) {
    return valor.slice(-5);
  }
  trimData(valor) {
    return valor.slice(0, 10);
  }

  onSubmit(): void {
    this.atendimento.inicio = this.data + ' ' + this.inicioAtendimento;
    this.atendimento.fim = this.data + ' ' + this.fimAtendimento;
    const result$ = this.modalConfirm.showConfirm(
      'Confirmação',
      'Deseja Salvar??',
      'Confirmar'
    );
    result$
      .asObservable()
      .pipe(
        take(1),
        switchMap((result) =>
          result ? this.atendimentoService.save(this.atendimento) : EMPTY
        )
      )
      .subscribe(
        (success) => {
          this.notificacaoService.criar(
            NotificationType.Success,
            'Salvo com Sucesso'
          );
          console.log('Atendimento salvo com sucesso!');
        },
        (error) => {
          console.error(error);
          this.erroService.tratarErro(error);
        }
      );
  }
  onRatingStar(funcionario: boolean, edit: boolean) {
    this.ratingService
      .showratingStar(this.atendimento, funcionario, edit)
      .subscribe((result) => {
        console.log(result);
      });
  }
}
