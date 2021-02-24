import { AgendamentoService } from './../../agendamento.service';
import { RatingService } from 'src/app/shared/rating/rating.service';
import { Atendimento } from 'src/app/models/atendimento';
import { Agendamento } from 'src/app/models/agendamento';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from 'src/app/auth/token.service';
import { AtendimentoService } from 'src/app/pages/atendimento/atendimento.service';
import { ErroService } from 'src/app/shared/erro/erro.service';
import { NotificacaoService } from 'src/app/shared/notificacao/notificacao.service';
import { AvaliacaoService } from 'src/app/pages/avaliacao/avaliacao.service';
import { Avaliacao } from 'src/app/models/avaliacao';
import { ModalConfirmacaoService } from 'src/app/shared/modal-confirmacao/modal-confirmacao.service';
import { NotificationType } from 'angular2-notifications';

@Component({
  selector: 'app-agendamento-cliente-view',
  templateUrl: './agendamento-cliente-view.component.html',
  styleUrls: ['./agendamento-cliente-view.component.css'],
})
export class AgendamentoClienteViewComponent implements OnInit {
  agendamento: Agendamento;
  statusPendente: boolean;
  atendimento: Atendimento;
  avaliacao: Avaliacao;
  fimAtendimento: string;
  inicioAtendimento: string;
  hideAtendimento = true;

  constructor(
    private tokenService: TokenService,
    private router: Router,
    private notificacaoService: NotificacaoService,
    private modalConfirm: ModalConfirmacaoService,
    private erroService: ErroService,
    private atendimentoService: AtendimentoService,
    private activatedRoute: ActivatedRoute,
    private ratingService: RatingService,
    private avaliacaoService: AvaliacaoService,
    private agendamentoService: AgendamentoService
  ) { }

  ngOnInit(): void {
    this.agendamento = this.activatedRoute.snapshot.data.agendamento;
    if (this.agendamento.status === 'PENDENTE') {
      this.statusPendente = true;
    }
    if (this.agendamento.status === 'ATENDIDO') {
      this.buscaAtendimento();
    }
  }
  buscaAtendimento(): void {
    this.atendimentoService
      .atendimentoPorAgendamento(this.agendamento.id)
      .subscribe(
        (result) => {
          this.atendimento = result;
          this.hideAtendimento = false;
          console.log(this.atendimento);
          this.inicioAtendimento = this.trimHora(this.atendimento.inicio);
          this.fimAtendimento = this.trimHora(this.atendimento.fim);
          this.buscaAvaliacao();
        },
        (error) => {
          console.error(error);
          this.erroService.tratarErro(error);
        }
      );
  }
  buscaAvaliacao(): void {
    this.avaliacaoService.avaliacaoAtendimento(this.atendimento.id).subscribe(
      (result) => {
        this.avaliacao = result;
        console.log('avaliação = ', this.avaliacao);
      },
      (error) => {
        console.error(error);
        this.erroService.tratarErro(error);
      }
    );
  }
  onRatingStar(funcionario: boolean, edit: boolean): void {
    if (this.avaliacao) {
      console.log('com avaliaçao');
      this.ratingService
        .showratingStar(this.atendimento, false, edit, this.avaliacao)
        .subscribe((result) => {
          console.log(result);
          //location.reload();
        });
    } else {
      this.ratingService
        .showratingStar(this.atendimento, false, edit)
        .subscribe((result) => {
          console.log(result);
          //location.reload();
        });
    }
  }
  trimHora(valor): any {
    return valor.slice(-5);
  }
  trimData(valor): any {
    return valor.slice(0, 10);
  }
  onCancel() {
    window.history.back();
  }
  cancelarAgendamento() {
    this.modalConfirm.showConfirm(
      'Confirmação',
      'Deseja cancelar seu Agendamento??',
      'Confirmar',
      'voltar'
    ).subscribe((result) => {
      if (result) {
        this.agendamento.status = 'CANCELADO';
        this.agendamentoService.save(this.agendamento).subscribe((success) => {
          this.notificacaoService.criar(
            NotificationType.Success,
            'Agendamento Cancelado'
          );
          this.router.navigate(['meusagendamentos']);
        },
          (error) => {
            console.error(error);
            this.erroService.tratarErro(error);
          });
      }
    });
  }
}
