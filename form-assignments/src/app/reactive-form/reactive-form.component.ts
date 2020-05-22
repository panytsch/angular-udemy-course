import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.less']
})
export class ReactiveFormComponent implements OnInit {
  form: FormGroup;
  result = '';
  projectStatuses: string[] = ['Stable', 'Critical', 'Finished'];

  constructor() {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      projectName: new FormControl(null, Validators.required, this.validateProjectName),
      email: new FormControl(null, [Validators.required, Validators.email]),
      projectStatus: new FormControl(null)
    });
  }

  onSubmit() {
    console.log(this.form);
    if (!this.form.valid) {
      return;
    }
    this.result = JSON.stringify(this.form.value, null, 4);
  }

  validateProjectName = (control: FormControl) => new Promise<any>((resolve) => {
    if (control.value !== 'Test') {
      resolve(null);
    } else {
      resolve({forbiddenName: true});
    }
  })
}
