import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-recuperar-senha',
  templateUrl: './recuperar-senha.component.html',
  styleUrls: ['./recuperar-senha.component.css']
})
export class RecuperarSenhaComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
  ) { }
  loading = false;
  maskCpf = '000.000.000-00';
  sucesso = false;
  erro = false;
  formulario: FormGroup;

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      cpf: [],
      email: []
    });
  }

}
