import { Component, OnInit, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-modal-confirmacao',
  templateUrl: './modal-confirmacao.component.html',
  styleUrls: ['./modal-confirmacao.component.css'],
})
export class ModalConfirmacaoComponent implements OnInit {
  @Input() title: string;
  @Input() msg: string;
  @Input() cancelTxt: 'Cancelar';
  @Input() okTxt: 'Confirmar';

  confirmResult: Subject<boolean>;

  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit(): void {
    this.confirmResult = new Subject();
  }
  onClose(): void {
    this.confirmAndCLose(false);
  }
  onConfirme() {
    this.confirmAndCLose(true);
  }
  private confirmAndCLose(value: boolean) {
    this.confirmResult.next(value);
    this.bsModalRef.hide();
  }
}
