import {Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {AlertComponent} from '../shared/alert/alert.component';
import {PlaceholderDirective} from '../shared/placeholder.directive';
import {Store} from '@ngrx/store';
import {IAppState} from '../store/app.reducer';
import {ClearErrorAction, LoginStartAction, SignUpStartAction} from './store/auth.actions';
import {IAuthState} from './store/auth.reducer';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
  private subs: Subscription[] = [];
  isLoginMode = true;
  form: FormGroup;
  processing = false;
  error = '';
  @ViewChild(PlaceholderDirective, {static: false})
  alertHost: PlaceholderDirective;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private store: Store<IAppState>) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    });
    this.subs.push(this.store.select('auth').subscribe((state: IAuthState) => {
      this.processing = state.loading;
      this.error = state.authError;
      if (this.error) {
        this.showErrorAlert(this.error);
      }
    }));
  }

  ngOnDestroy() {
    this.subs.forEach(s => s.unsubscribe());
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }
    this.processing = true;
    const {email, password} = this.form.value;
    if (this.isLoginMode) {
      this.store.dispatch(new LoginStartAction(email, password));
    } else {
      this.store.dispatch(new SignUpStartAction(email, password));
    }
    this.form.reset();
  }

  onCloseAlert = () => {
    this.store.dispatch(new ClearErrorAction());
  }

  private showErrorAlert(message: string): void {
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContRef = this.alertHost.viewContainerRef;
    hostViewContRef.clear();
    const alertComp = hostViewContRef.createComponent<AlertComponent>(alertCmpFactory);
    alertComp.instance.message = message;
    this.subs.push(alertComp.instance.closeEvent.subscribe(() => {
      this.onCloseAlert();
      hostViewContRef.clear();
    }));
  }
}
