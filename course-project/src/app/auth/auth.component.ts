import {Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from './auth.service';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {StaticRoutesEnum} from '../routing/routes/types';
import {AlertComponent} from '../shared/alert/alert.component';
import {PlaceholderDirective} from '../shared/placeholder.directive';

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


  constructor(private authService: AuthService,
              private router: Router,
              private componentFactoryResolver: ComponentFactoryResolver) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    });
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
      this.subs.push(this.authService.login(email, password).subscribe(this.authSuccess, this.authFail));
    } else {
      this.subs.push(this.authService.signUp(email, password).subscribe(this.authSuccess, this.authFail));
    }
    this.form.reset();
  }

  private authSuccess = (): void => {
    this.processing = false;
    this.router.navigateByUrl(StaticRoutesEnum.Recipe);
  }

  private authFail = (err: string): void => {
    this.processing = false;
    this.error = err;
    this.showErrorAlert(err);
  }

  onCloseAlert = () => {
    this.error = '';
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
