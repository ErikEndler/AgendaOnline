import { TestBed } from '@angular/core/testing';

import { UsuarioResolverGuard } from './usuario-resolver.guard';

describe('UsuarioResolverGuard', () => {
  let guard: UsuarioResolverGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UsuarioResolverGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
