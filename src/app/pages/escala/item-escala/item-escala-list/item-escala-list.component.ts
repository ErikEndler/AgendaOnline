import { Servico } from './../../../../models/servico';
import { Escala } from './../../../../models/escala';
import { EscalaService } from './../../escala/escala.service';
import { ErroService } from './../../../../shared/erro/erro.service';
import { ItemEscalaService } from '../item-escala.service';
import { ItemEscala } from './../../../../models/itemEscala';
import { Component, Input, OnInit } from '@angular/core';
import { switchMap, take } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { ModalConfirmacaoService } from 'src/app/shared/modal-confirmacao/modal-confirmacao.service';
import { ServicoEscalaFormService } from '../../servico-escala-form.service';

@Component({
  selector: 'app-item-escala-list',
  templateUrl: './item-escala-list.component.html',
  styleUrls: ['./item-escala-list.component.css'],
})
export class ItemEscalaListComponent implements OnInit {
  vazio = true;
  @Input() itensEscala: ItemEscala[];

  constructor() {}

  ngOnInit(): void {}
}
