import { ItemEscala } from 'src/app/models/itemEscala';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { ErroService } from 'src/app/shared/erro/erro.service';
import { Escala } from 'src/app/models/escala';
import { ItemEscalaService } from '../item-escala.service';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-item-escala-form',
  templateUrl: './item-escala-form.component.html',
  styleUrls: ['./item-escala-form.component.css'],
})
export class ItemEscalaFormComponent implements OnInit {
  formulario: FormGroup;
  botaoAdicionar = true;
  @Input() itemEscala: ItemEscala = new ItemEscala();
  @Input() escalaId: number;
  confirmResult: Subject<any>;
  confirmResult2: Subject<boolean>;

  constructor(
    private formBuilder: FormBuilder,
    private erroService: ErroService,
    private itemEscalaService: ItemEscalaService,
    public bsModalRef: BsModalRef
  ) {}

  ngOnInit(): void {
    this.confirmResult = new Subject();
    this.confirmResult2 = new Subject();
    this.formulario = this.formBuilder.group({
      id: [this.itemEscala?.id],
      escala: [this.itemEscala?.escala],
      hrInicial: [this.itemEscala?.hrInicial],
      hrFinal: [this, this.itemEscala?.hrFinal],
    });
  }

  onClose(): void {
    this.confirmAndCLose(false);
  }
  onSubmit(): void {
    if (this.itemEscala.escala === undefined) {
      this.itemEscala.escala = this.escalaId;
    }
    console.log('sera enviado para salvar - - ', this.itemEscala);
    this.itemEscalaService.save(this.itemEscala).subscribe(
      (success: ItemEscala) => {
        console.log('salvo com sucesso!');
        if (this.itemEscala.id) {
          this.confirmAndCLose(true);
        } else {
          this.confirmAndCLose(true, success);
        }
      },
      (error) => {
        console.error(error);
        this.erroService.tratarErro(error);
      }
    );
  }
  onDelete(): void {
    if (this.itemEscala.id) {
      console.log('Entrou no delete!');
      this.itemEscalaService.remove(this.itemEscala.id).subscribe(
        (success: ItemEscala) => {
          console.log('Deletado com sucesso !');
          this.confirmResult.next(this.itemEscala.id);
          this.bsModalRef.hide();
        },
        (error) => {
          console.error(error);
          this.erroService.tratarErro(error);
        }
      );
    }
  }
  confirmAndCLose(value: boolean, itemEscala?: ItemEscala): void {
    this.confirmResult2.next(value);
    if (value === false) {
      this.confirmResult.next(value);
      this.bsModalRef.hide();
    }
    if (value === true) {
      this.confirmResult.next(itemEscala);
      this.bsModalRef.hide();
    }
  }
}
