import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-notificacao',
  templateUrl: './notificacao.component.html',
  styleUrls: ['./notificacao.component.css']
})
export class NotificacaoComponent implements OnInit {

  constructor(
    private notifications: NotificationsService,
    private fb: FormBuilder
  ) { }
  type: string;
  title: string;
  content: string;
  timeOut: 5000;
  showProgressBar: true;
  pauseOnHover: true;
  clickToClose: true;
  animate: 'fromRight';

  form: FormGroup;

  ngOnInit() {

  }

  public criar() {

    const temp = this.form.getRawValue();
    const title = temp.title;
    const content = temp.content;
    const type = temp.type;

    delete temp.title;
    delete temp.content;
    delete temp.type;

    this.notifications.create(title, content, type, temp);
  }

}
