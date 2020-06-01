import {Component, Inject, OnInit, PLATFORM_ID, ViewEncapsulation} from '@angular/core';
import {Store} from '@ngrx/store';
import {AutoLoginAction} from './auth/store/auth.actions';
import {IAppState} from './store/app.reducer';
import {isPlatformBrowser} from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  constructor(private store: Store<IAppState>,
              @Inject(PLATFORM_ID) private platformId) {
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)){
      this.store.dispatch(new AutoLoginAction());
    }
  }
}
