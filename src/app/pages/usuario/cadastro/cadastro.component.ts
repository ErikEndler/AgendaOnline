import { ErroService } from '../../../shared/erro/erro.service';
import { Usuario } from 'src/app/models/usuario';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalConfirmacaoService } from 'src/app/shared/modal-confirmacao/modal-confirmacao.service';
import { UsuarioService } from '../usuario.service';
import { switchMap, take } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
})
export class CadastroComponent implements OnInit {
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
    private modalCOnfirm: ModalConfirmacaoService,
    private router: Router,
    private erroService: ErroService
  ) { }

  ngOnInit(): void {
    const usuario = new Usuario();
    usuario.role = 'ROLE_USER';
    this.formulario = this.formBuilder.group({
      id: [usuario.id],
      nome: [usuario.nome, Validators.required],
      cpf: [usuario.cpf, Validators.required],
      email: [usuario.email],
      role: [usuario.role, Validators.required],
      sexo: [usuario.sexo],
      telefone: [usuario.telefone, Validators.required],
      whatsapp: [usuario.whatsapp],
      senha: [usuario.senha, Validators.required],
      notificacao: true,
      notificacaoEmail: true,
      notificacaoWhatsapp: false,
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
}
