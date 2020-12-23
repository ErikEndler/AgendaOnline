import { Router } from '@angular/router';
import { take, switchMap } from 'rxjs/operators';
import { Observable, EMPTY, Subject } from 'rxjs';
import { AuthService } from './../../../auth/auth.service';
import { ModalLoginService } from './../modal-login.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ErroService } from '../../erro/erro.service';

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
    private authService: AuthService,
    private router: Router,
    private erroService: ErroService
  ) { }

  form: FormGroup = new FormGroup({
    cpf: new FormControl(''),
    senha: new FormControl(''),
  });

  confirmResult: Subject<boolean>;

  ngOnInit(): void {
    this.confirmResult = new Subject();
  }

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
            this.confirmResult.next(true);
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
          this.erroService.tratarErro(error);
        }
      );
  }
  onClose(): void {
    this.confirmResult.next(false);
    this.bsModalRef.hide();
  }
  cadastrar(): void {
    this.router.navigate(['novousuario']);
    this.bsModalRef.hide();
  }
}
