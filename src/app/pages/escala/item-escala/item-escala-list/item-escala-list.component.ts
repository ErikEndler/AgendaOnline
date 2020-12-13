import { ItemEscala } from 'src/app/models/itemEscala';
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ItemEscalaFormService } from '../item-escala-form/item-escala-form.service';
import { ErroService } from 'src/app/shared/erro/erro.service';

@Component({
  selector: 'app-item-escala-list',
  templateUrl: './item-escala-list.component.html',
  styleUrls: ['./item-escala-list.component.css'],
})
export class ItemEscalaListComponent implements OnInit {
  vazio = true;
  @Input() itensEscala: ItemEscala[];
  @Input() escalaId: number;
  itemEscala: ItemEscala;
  formulario: FormGroup;

  constructor(
    private itemEscalaFormService: ItemEscalaFormService,
    private erroService: ErroService
  ) {}

  ngOnInit(): void {}

  editarItemEscala(itemEscala?: ItemEscala, index?: number): void {
    this.itemEscalaFormService
      .openItemEscalaForm(this.escalaId, itemEscala)
      .subscribe(
        (result) => {
          console.log('resultado do modal : ', result);
          if (typeof result === 'boolean') {
          } else if (typeof result === 'object') {
            this.itensEscala.push(result);
          } else if (typeof result === 'number') {
            console.log('fazendo splice');
            this.itensEscala.splice(index, 1);
          }
        },
        (error) => {
          console.error(error);
          this.erroService.tratarErro(error);
        }
      );
  }
}
