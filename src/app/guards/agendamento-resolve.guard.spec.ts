import { TestBed } from '@angular/core/testing';

import { AgendamentoResolveGuard } from './agendamento-resolve.guard';

describe('AgendamentoResolveGuard', () => {
  let guard: AgendamentoResolveGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AgendamentoResolveGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
