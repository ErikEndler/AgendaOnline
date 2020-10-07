import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicoListComponent } from './servico-list.component';

describe('ServicoListComponent', () => {
  let component: ServicoListComponent;
  let fixture: ComponentFixture<ServicoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
