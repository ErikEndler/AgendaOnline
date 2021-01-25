import { Avaliacao } from './../../../models/avaliacao';
import { AvaliacaoService } from 'src/app/pages/avaliacao/avaliacao.service';
import { Agendamento } from 'src/app/models/agendamento';
import { Atendimento } from 'src/app/models/atendimento';
import { AtendimentoService } from './../atendimento.service';
import { Component, OnInit } from '@angular/core';
import { ErroService } from 'src/app/shared/erro/erro.service';
import { TokenService } from 'src/app/auth/token.service';
import { ActivatedRoute, Router } from '@angular/router';
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
    private route: ActivatedRoute,
    private router: Router,
    private notificacaoService: NotificacaoService,
    private formBuilder: FormBuilder,
    private ratingService: RatingService,
    private avaliacaoService: AvaliacaoService
  ) { }
  atendimento: Atendimento;
  formularioAtendimento: FormGroup;
  fimAtendimento: string;
  inicioAtendimento: string;
  data: string;
  avaliacao: Avaliacao;
  editar = false;
  btnEditar = 'Editar';

  ngOnInit(): void {
    this.atendimento = this.route.snapshot.data.atendimento;
    this.fimAtendimento = this.trimHora(this.atendimento.fim);
    this.data = this.trimData(this.atendimento.inicio);
    this.inicioAtendimento = this.trimHora(this.atendimento.inicio);
    this.buscaAvaliacao();
  }
  buscaAvaliacao(): void {
    this.avaliacaoService.avaliacaoAtendimento(this.atendimento.id).subscribe(
      (result) => { this.avaliacao = result; },
      (error) => {
        console.error(error);
        this.erroService.tratarErro(error);
      });
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
    });
  }
  trimHora(valor): any {
    return valor.slice(-5);
  }
  trimData(valor): any {
    return valor.slice(0, 10);
  }

  onSubmit(): void {
    if (!this.editar) {
      this.editar = true;
      this.btnEditar = 'Salvar Alterações';
    } else {
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
      this.editar = false;
      this.btnEditar = 'Editar';
    }
  }
  onCancel(): void {
    if (this.editar) {
      console.log('if');

      this.editar = false;
      this.btnEditar = 'Editar';
    } else {
      console.log('else');
      this.router.navigate(['atendimento/funcionario']);
    }
  }
  onRatingStar(funcionario: boolean, edit: boolean): void {
    if (this.avaliacao) {
      console.log('com avaliaçao')
      this.ratingService
        .showratingStar(this.atendimento, funcionario, edit, this.avaliacao)
        .subscribe((result) => {
          console.log(result);
        });
    } else {
      this.ratingService
        .showratingStar(this.atendimento, funcionario, edit)
        .subscribe((result) => {
          console.log(result);
        });
    }

  }
}
