import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Store} from '@ngrx/store';
import {AutoLoginAction} from './auth/store/auth.actions';
import {IAppState} from './store/app.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  constructor(private store: Store<IAppState>) {
  }

  ngOnInit() {
    this.store.dispatch(new AutoLoginAction());
  }
}
