import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthResponseData, AuthService} from './auth.service';
import {Subscription} from 'rxjs';

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

  constructor(private authService: AuthService) {
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
    if (this.isLoginMode) {
      return;
    }
    const {email, password} = this.form.value;
    this.subs.push(this.authService.signUp(email, password).subscribe(this.authSuccess, this.authFail));
    this.form.reset();
  }

  private authSuccess = (res: AuthResponseData): void => {
    this.processing = false;
    console.log(res);
  }

  private authFail = (err: string): void => {
    this.processing = false;
    this.error = err;
  }
}
