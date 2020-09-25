import { TestBed } from '@angular/core/testing';

import { ModalConfirmacaoService } from './modal-confirmacao.service';

describe('ModalConfirmacaoService', () => {
  let service: ModalConfirmacaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalConfirmacaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
