import { NotificacaoService } from 'src/app/shared/notificacao/notificacao.service';
import { Usuario } from 'src/app/models/usuario';
import { ErroService } from './../../../shared/erro/erro.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { EMPTY } from 'rxjs';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
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
  admin = false;
  user: LoginReturn;
  formulario: FormGroup;
  hide = true;
  loading = false;
  maskFone = '(00) 0 0000 - 0000';
  maskCpf = '000.000.000-00';
  debugEnable = false;
  usuario: Usuario;
  disableAtribuicao = true;
  confirmaSenha: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private serviceUsuario: UsuarioService,
    private modalCOnfirm: ModalConfirmacaoService,
    private router: Router,
    private erroService: ErroService,
    private notificacaoService: NotificacaoService
  ) {}

  ngOnInit(): void {
    if (this.router.url.match(/.*perfil*/)) {
      console.log('URL = ' + this.router.url);
      this.verificaCredencial();
    }

    this.usuario = this.route.snapshot.data.usuario;
    if (this.usuario.role !== 'ROLE_USER' && this.usuario.role !== null) {
      this.disableAtribuicao = false;
    }
    if (this.usuario.role === null || this.usuario.role === undefined) {
      this.usuario.role = 'ROLE_USER';
    }
    this.formulario = this.formBuilder.group({
      id: [this.usuario.id],
      nome: [this.usuario.nome, Validators.required],
      cpf: [this.usuario.cpf, Validators.required],
      email: [this.usuario.email],
      role: [this.usuario.role, Validators.required],
      sexo: [this.usuario.sexo],
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
            this.notificacaoService.criar(
              NotificationType.Success,
              'Salvo com Sucesso'
            );
            console.log('Usuario Cadastrado!'),
              this.router.navigate(['/usuario']);
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
  confirmarSenha(): boolean {
    if (
      this.confirmaSenha !== this.formulario.controls.senha.value &&
      this.formulario.get('senha').touched
    ) {
      return false;
    }
    return true;
  }
  habilitaEnviar(): boolean {
    if (this.formulario.valid) {
      if (this.confirmaSenha === this.formulario.controls.senha.value) {
        return false;
      }
    }
    return true;
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
      this.admin = true;
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
    this.router.navigate(['sf'], {
      queryParams: { id: this.usuario.id },
    });
  }
  atribuirEscala(): void {
    this.router.navigate(['escala'], {
      queryParams: { id: this.usuario.id },
    });
  }
}
