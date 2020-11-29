import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicoViewComponent } from './servico-view.component';

describe('ServicoViewComponent', () => {
  let component: ServicoViewComponent;
  let fixture: ComponentFixture<ServicoViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServicoViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicoViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
