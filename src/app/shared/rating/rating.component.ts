import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, public bsModalRef: BsModalRef
  ) { }
  formulario: FormGroup;
  @Input() nota: number;
  @Output() respostaNota = new EventEmitter();
  confirmResult: Subject<boolean>;

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      nota: [this.nota],
    });

  }
  click(): void {
    this.respostaNota.emit(this.formulario.value['nota']);
  }
  onClose(): void {
    this.confirmAndCLose(false);
  }
  onConfirme(): void {
    this.confirmAndCLose(true);
  }
  private confirmAndCLose(value: boolean): void {
    this.confirmResult.next(value);
    this.bsModalRef.hide();
  }

}
