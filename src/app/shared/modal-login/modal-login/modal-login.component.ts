import { LoginReturn } from './../../../models/loginReturn';
import { HttpClient } from '@angular/common/http';
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
  url = 'http://localhost:8080/login';
  loginReturn: LoginReturn;
  maskCpf = '000.000.000-00';

  constructor(public bsModalRef: BsModalRef, private http: HttpClient) {}

  form: FormGroup = new FormGroup({
    cpf: new FormControl(''),
    senha: new FormControl(''),
  });

  ngOnInit(): void {}
  login() {
    this.loading = true;
    return this.http.post(this.url, this.form).subscribe((data) => {
      this.loginReturn = data as LoginReturn;
      sessionStorage.setItem('logado', 'true');
      sessionStorage.setItem('userID', this.loginReturn.id.toString());
      sessionStorage.setItem('userName', this.loginReturn.nome);
      sessionStorage.setItem('Authorization', this.loginReturn.authorization);
    });
  }
  onClose() {}
}
