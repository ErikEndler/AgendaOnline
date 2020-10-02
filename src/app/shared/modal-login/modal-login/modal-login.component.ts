import { take, switchMap } from 'rxjs/operators';
import { Observable, EMPTY } from 'rxjs';
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

  login(): void {
    // chama metodo do serviço para logar
    this.loading = true;

    const result$ = this.authService.logar(this.form.value);
    result$
      .asObservable()
      .pipe(take(1))
      .subscribe(
        (success) => {
          if (success === true) {
            console.log(success + ' Logado com sucesso! 2');
            this.loading = false;
            this.bsModalRef.hide();
          } else {
            this.loading = false;
            console.log(success + ' Erro ao logar! 2');
          }
        },
        (error) => {
          this.loading = false;
          console.log('Erro ao logar 2');
          console.error(error);
        }
      );
  }
  onClose(): void {
    this.bsModalRef.hide();
  }
}
