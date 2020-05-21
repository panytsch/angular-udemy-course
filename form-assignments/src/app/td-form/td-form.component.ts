import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-td-form',
  templateUrl: './td-form.component.html',
  styleUrls: ['./td-form.component.less']
})
export class TdFormComponent implements OnInit {
  subscriptions: string[];
  defaultSubscription: string;
  result = '';

  constructor() {
  }

  ngOnInit(): void {
    this.subscriptions = ['Basic', 'Advanced', 'Pro'];
    this.defaultSubscription = this.subscriptions[1];
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    this.result = JSON.stringify(form.form.value, null, 4);
  }
}
