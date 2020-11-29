import { NotificacaoService } from 'src/app/shared/notificacao/notificacao.service';
import { ServicoFuncionarioService } from '../servico-funcionario.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EMPTY } from 'rxjs';
import { switchMap, take, delay } from 'rxjs/operators';
import { Servico } from 'src/app/models/servico';
import { Usuario } from 'src/app/models/usuario';
import { ErroService } from 'src/app/shared/erro/erro.service';
import { ModalConfirmacaoService } from 'src/app/shared/modal-confirmacao/modal-confirmacao.service';
import { ServicoService } from '../../servico/servico.service';
import { NotificationType } from 'angular2-notifications';
import { UsuarioService } from '../../usuario/usuario.service';

@Component({
  selector: 'app-funcionario',
  templateUrl: './servico-funcionario.component.html',
  styleUrls: ['./servico-funcionario.component.css'],
})
export class ServicoFuncionarioComponent implements OnInit {
  formulario: FormGroup;
  listaUsuario: Usuario[];
  listaServico: Servico[];
  servicos: Servico[];

  page = 1;
  pageS = 1;
  pageSize = 4;
  pageSizeS = 4;
  collectionSize: any;
  collectionSizeS: any;
  usuarios: Usuario[];
  colunasUsuario: string[] = ['selecione', 'nome', 'cpf', 'email'];
  colunasServico: string[] = ['selecione', 'nome', 'categoria'];
  loading = true;
  funcionario: Usuario;
  servico: Servico;

  constructor(
    private modalCOnfirm: ModalConfirmacaoService,
    private servicoService: ServicoService,
    private formBuilder: FormBuilder,
    private serviceUsuario: UsuarioService,
    private erroService: ErroService,
    private servicoFuncionarioService: ServicoFuncionarioService,
    private notificacaoService: NotificacaoService
  ) {}

  ngOnInit(): void {
    this.listUsuario();
    this.listServico();
    this.formulario = this.formBuilder.group({
      id: [],
      funcionarioId: [],
      servicoId: [],
    });
  }
  onSubmit(): void {
    this.formulario.controls['funcionarioId'].setValue(this.funcionario.id);
    this.formulario.controls['servicoId'].setValue(this.servico.id);
    if (this.formulario.valid) {
      const result$ = this.modalCOnfirm.showConfirm(
        'Confirmação',
        'Deseja Salvar??',
        'Confirmar'
      );
      result$
        .asObservable()
        .pipe(
          take(1),
          switchMap((result) =>
            result
              ? this.servicoFuncionarioService.save(this.formulario.value)
              : EMPTY
          )
        )
        .subscribe(
          (success) => {
            console.log('salvo com sucesso!'),
              this.notificacaoService.criar(
                NotificationType.Success,
                'Salvo com sucesso'
              ),
              delay(1000);
          },
          (error) => {
            console.error(error);
            this.erroService.tratarErro(error);
          }
        );
      console.log(this.formulario.value);
    }
  }
  listUsuario(): void {
    this.loading = true;
    this.serviceUsuario.list().subscribe(
      (dados) => {
        this.listaUsuario = dados;
        this.collectionSize = this.listaUsuario.length;
        this.loading = false;
        this.refreshUsuarios();
      },
      (error) => {
        console.error(error);
        this.erroService.tratarErro(error);
      }
    );
  }
  refreshUsuarios(): void {
    this.usuarios = this.listaUsuario
      .map((usuario, i) => ({ ...usuario }))
      .slice(
        (this.page - 1) * this.pageSize,
        (this.page - 1) * this.pageSize + this.pageSize
      );
  }
  listServico(): void {
    this.loading = true;
    this.servicoService.list().subscribe(
      (dados) => {
        this.listaServico = dados;
        this.collectionSize = this.listaServico.length;
        this.loading = false;
        this.refreshServico();
      },
      (error) => {
        console.error(error);
        this.erroService.tratarErro(error);
      }
    );
  }
  refreshServico(): void {
    this.servicos = this.listaServico
      .map((servico, i) => ({ ...servico }))
      .slice(
        (this.pageS - 1) * this.pageSizeS,
        (this.pageS - 1) * this.pageSizeS + this.pageSizeS
      );
  }
  selecionarFuncionario(usuario: Usuario): void {
    this.funcionario = usuario;
  }
  selecionarServico(servico: Servico): void {
    this.servico = servico;
  }
}
