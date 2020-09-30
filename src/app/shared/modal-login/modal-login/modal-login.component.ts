import { AuthService } from './../../../auth/auth.service';
import { ModalLoginService } from './../modal-login.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-login',
  templateUrl: './modal-login.component.html',
  styleUrls: ['./modal-login.component.css'],
})
export class ModalLoginComponent implements OnInit {
  hide = true;
  loading = false;
  titulo = 'Login';
  maskCpf = '000.000.000-00';

  constructor(
    public bsModalRef: BsModalRef,
    private authService: AuthService
  ) {}

  form: FormGroup = new FormGroup({
    cpf: new FormControl(''),
    senha: new FormControl(''),
  });

  ngOnInit(): void {}
  login() {
    // chama metodo do serviço para logar
    this.authService.logar(this.form.value);
    this.loading = true;
    this.bsModalRef.hide();
  }
  onClose(): void {
    this.bsModalRef.hide();
  }
}
