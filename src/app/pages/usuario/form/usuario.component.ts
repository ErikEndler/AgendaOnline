import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { EMPTY } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalConfirmacaoService } from './../../../shared/modal-confirmacao.service';
import { switchMap, take } from 'rxjs/operators';
import { UsuarioService } from './../usuario.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css'],
})
export class UsuarioComponent implements OnInit {
  formulario: FormGroup;
  hide = true;
  loading = false;
  maskFone = '(00) 0 0000 - 0000';
  maskCpf = '000.000.000-00';
  debugEnable = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private serviceUsuario: UsuarioService,
    private modalCOnfirm: ModalConfirmacaoService
  ) {}

  ngOnInit(): void {
    const usuario = this.route.snapshot.data['usuario'];
    if (usuario.role == null) {
      usuario.role = 'ROLE_USER';
    }
    this.formulario = this.formBuilder.group({
      id: [usuario.id],
      nome: [usuario.nome, Validators.required],
      cpf: [usuario.cpf, Validators.required],
      email: [usuario.cpf, Validators.required],
      role: [usuario.role, Validators.required],
      sexo: [usuario.sexo, Validators.required],
      telefone: [usuario.telefone, Validators.required],
      whatsapp: [usuario.whatsapp],
      senha: [usuario.senha],
      notificacao: [usuario.notificacao],
      notificacaoSms: [usuario.notificacaoSms],
      notificacaoEmail: [usuario.notificacaoEmail],
      notificacaoWhatsapp: [usuario.notificacaoWhatsapp],
    });
  }

  onSubmit(): void {
    if (this.formulario.valid) {
      const result$ = this.modalCOnfirm.showConfirm(
        'Confirmação',
        'Deseja Salvar??',
        'Confirmaaarrr'
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
          (success) => console.log('salvo com sucesso!'),
          (error) => {
            console.error(error),
              console.log(error),
              console.log('ERRO AO SALVAR');
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
}
