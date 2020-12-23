import { NotificacaoService } from 'src/app/shared/notificacao/notificacao.service';
import { Usuario } from 'src/app/models/usuario';
import { ErroService } from './../../../shared/erro/erro.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { EMPTY } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalConfirmacaoService } from '../../../shared/modal-confirmacao/modal-confirmacao.service';
import { switchMap, take } from 'rxjs/operators';
import { UsuarioService } from './../usuario.service';
import { LoginReturn } from 'src/app/models/loginReturn';
import { NotificationType } from 'angular2-notifications';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css'],
})
export class UsuarioComponent implements OnInit {
  user: LoginReturn;
  formulario: FormGroup;
  hide = true;
  loading = false;
  maskFone = '(00) 0 0000 - 0000';
  maskCpf = '000.000.000-00';
  debugEnable = false;
  usuario: Usuario;
  disableAtribuicao = true;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private serviceUsuario: UsuarioService,
    private modalCOnfirm: ModalConfirmacaoService,
    private router: Router,
    private erroService: ErroService,
    private notificacaoService: NotificacaoService
  ) { }

  ngOnInit(): void {
    this.verificaCredencial();
    this.usuario = this.route.snapshot.data.usuario;
    if (this.usuario.role !== 'ROLE_USER' && this.usuario.role !== null) {
      this.disableAtribuicao = false;
    }
    if (this.usuario.role === null) {
      this.usuario.role = 'ROLE_USER';
    }
    this.formulario = this.formBuilder.group({
      id: [this.usuario.id],
      nome: [this.usuario.nome, Validators.required],
      cpf: [this.usuario.cpf, Validators.required],
      email: [this.usuario.email, Validators.required],
      role: [this.usuario.role, Validators.required],
      sexo: [this.usuario.sexo, Validators.required],
      telefone: [this.usuario.telefone, Validators.required],
      whatsapp: [this.usuario.whatsapp],
      senha: [this.usuario.senha],
      notificacao: [this.usuario.notificacao],
      notificacaoEmail: [this.usuario.notificacaoEmail],
      notificacaoWhatsapp: [this.usuario.notificacaoWhatsapp],
    });
  }

  onSubmit(): void {
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
            result ? this.serviceUsuario.save(this.formulario.value) : EMPTY
          )
        )
        .subscribe(
          (success) => {
            console.log('salvo com sucesso!'), this.router.navigate(['']);
          },
          (error) => {
            console.error(error);
            this.erroService.tratarErro(error);
          }
        );
      console.log(this.formulario.value);
    }
  }
  onCancel(): void {
    this.formulario.reset();
  }

  debug(): void {
    this.debugEnable = !this.debugEnable;
  }
  verificaValidTouched(campo): boolean {
    return (
      !this.formulario.get(campo).valid && this.formulario.get(campo).touched
    );
  }
  aplicaCssErro(campo) {
    return {
      'has-error': this.verificaValidTouched(campo),
      'has-feedback': this.verificaValidTouched(campo),
    };
  }
  verificaCredencial(): void {
    this.user = this.serviceUsuario.getCredencial();
    if (this.user.role !== 'ROLE_USER') {
      const habilitaBotao = true;
    }
  }
  atribuirFuncao(): void {
    if (this.usuario.id === null || this.usuario.role === 'ROLE_USER') {
      this.notificacaoService.criar(
        NotificationType.Error,
        'ERROR',
        'não ha funcionario atribuido'
      );
    }
    this.router.navigate(['sf2'], {
      queryParams: { id: this.usuario.id },
    });
  }
  atribuirEscala(): void {
    this.router.navigate(['escala'], {
      queryParams: { id: this.usuario.id, nome: this.usuario.nome },
    });
  }

}
