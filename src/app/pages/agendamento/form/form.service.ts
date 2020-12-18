import { Injectable } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  constructor(private modalservice: BsModalService) {}
}
