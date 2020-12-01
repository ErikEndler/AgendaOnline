import { Servico } from 'src/app/models/servico';
import { ServicoFuncionario } from '../../models/servico-funcionario';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CrudService } from 'src/app/shared/crud-service';
import { Observable } from 'rxjs';
import { delay, take } from 'rxjs/operators';
import { AppSettings } from 'src/app/shared/appSettings';

@Injectable({
  providedIn: 'root',
})
export class ServicoFuncionarioService extends CrudService<ServicoFuncionario> {
  constructor(protected http: HttpClient) {
    super(http, AppSettings.url + '/api/servico/funcionario');
  }
  listarServicosFuncionario(idFunc): Observable<Array<Servico>> {
    return this.http
      .get<Array<Servico>>(
        AppSettings.url + '/api/servico/funcionario/funcionario/' + idFunc
      )
      .pipe(delay(200));
  }
  deletarServicoFUncionario(servicoFuncionario: ServicoFuncionario) {
    return this.http
      .post(AppSettings.url + '/api/servico/funcionario/delete', servicoFuncionario)
      .pipe(take(1));
  }
}
