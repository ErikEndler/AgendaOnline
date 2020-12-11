import { ItemEscala } from 'src/app/models/itemEscala';
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-item-escala-list',
  templateUrl: './item-escala-list.component.html',
  styleUrls: ['./item-escala-list.component.css'],
})
export class ItemEscalaListComponent implements OnInit {
  vazio = true;
  @Input() itensEscala: ItemEscala[];
  itemEscala: ItemEscala;
  formulario: FormGroup;


  constructor(private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.formBuilder.array([]);

    this.formulario = this.formBuilder.group({
      id: [],
      escala: [],
      hrInicial: [],
      hrFinal: [],
    });
    //const itemFormArray = this.itensEscala.map(c => new FormControl());
  }
  buildItemForm() {
    return this.formBuilder.group({
      id: [],
      escala: [],
      hrInicial: [],
      hrFinal: [],
    });
  }
}
