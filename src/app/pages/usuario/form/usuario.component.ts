import { UsuarioService } from './../usuario.service';
import { Usuario } from '../../../models/usuario';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css'],
})
export class UsuarioComponent implements OnInit {
  formulario: FormGroup;
  hide = true;
  maskFone = '000.000.000-00';
  maskCpf = '000.000.000-00';
  debugEnable = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private serviceUsuario: UsuarioService
  ) {}

  ngOnInit(): void {
    const usuario = this.route.snapshot.data['usuario'];
    this.formulario = this.formBuilder.group({
      id: [usuario.id],
      nome: [usuario.nome, Validators.required],
      cpf: [usuario.cpf, Validators.required],
      role: [usuario.role, Validators.required],
      sexo: [usuario.sexo, Validators.required],
      telefone: [usuario.telefone, Validators.required],
      whatsapp: [usuario.whatsapp],
    });
  }
  onSubmit() {
    if (this.formulario.valid) {
      console.log('submit');
      this.serviceUsuario.save(this.formulario.value).subscribe(
        (success) => console.log('salvo com sucesso!'),
        (error) => console.error(error),
        () => console.log('request completo')
      );
      console.log(this.formulario.value);
    }
  }
  onCancel() {
    this.formulario.reset();
  }

  debug() {
    this.debugEnable = !this.debugEnable;
  }
}
