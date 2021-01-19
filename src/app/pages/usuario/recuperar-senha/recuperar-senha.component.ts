import { UsuarioService } from './../usuario.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalLoginService } from 'src/app/shared/modal-login/modal-login.service';
import { ErroService } from 'src/app/shared/erro/erro.service';

@Component({
  selector: 'app-recuperar-senha',
  templateUrl: './recuperar-senha.component.html',
  styleUrls: ['./recuperar-senha.component.css']
})
export class RecuperarSenhaComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private serviceUsuario: UsuarioService,
    private modalLoginService: ModalLoginService,
    private erroService: ErroService

  ) { }
  loading = false;
  maskCpf = '000.000.000-00';
  sucesso = false;
  erro = false;
  formulario: FormGroup;

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      cpf: [null, Validators.required],
      email: [null, Validators.required]
    });
  }
  submit(): void {
    if (this.formulario.valid) {
      this.serviceUsuario.novaSenha(this.formulario.value).subscribe((result) => {
        this.sucesso = true;
      },
        (error) => {
          console.error(error);
          this.erro = true;
          // this.erroService.tratarErro(error);
        });
    }
  }
  logar(): void {
    this.modalLoginService.open();
  }
}
