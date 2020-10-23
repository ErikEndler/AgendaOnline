import { Escala } from './../../../../models/escala';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-escala',
  templateUrl: './escala.component.html',
  styleUrls: ['./escala.component.css']
})
export class EscalaComponent implements OnInit {
  formulario: FormGroup;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute,

  ) { }

  ngOnInit(): void {
    // const categoria = this.route.snapshot.data['categoria'];
    this.formulario = this.formBuilder.group({
      id: [null],
      nome: [null],
      descricao: [null],
    });

  }

  finishFunction() {

  }

}
