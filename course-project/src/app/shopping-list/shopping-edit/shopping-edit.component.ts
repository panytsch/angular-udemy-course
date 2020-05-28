import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ingredient} from '../../shared/ingredient.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import {IAppState} from '../../store';
import {
  AddIngredientAction,
  DeleteIngredientAction,
  StopEditAction,
  UpdateIngredientAction
} from '../store/shopping-list.actions';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  private indexChangedSubs: Subscription;
  form: FormGroup;
  isEditMode = false;

  constructor(private store: Store<IAppState>) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      amount: new FormControl(null, this.validateAmount),
    });
    this.store.select('shoppingList').subscribe(stateData => {
      if (stateData.editedIngredientIndex < 0) {
        this.isEditMode = false;
      } else {
        this.isEditMode = true;
        this.form.setValue({
          name: stateData.editedIngredient.name,
          amount: stateData.editedIngredient.amount
        });
      }
    });
  }

  ngOnDestroy() {
    this.indexChangedSubs.unsubscribe();
    this.store.dispatch(new StopEditAction());
  }

  validateAmount = (control: FormControl) => control.value > 0 ? null : {lowValue: true};

  onSubmit = (): void => {
    if (this.form.invalid) {
      return;
    }
    const ingredient = new Ingredient(this.form.value.name, this.form.value.amount);
    if (this.isEditMode) {
      this.store.dispatch(new UpdateIngredientAction(ingredient));
    } else {
      this.store.dispatch(new AddIngredientAction(ingredient));
    }
    this.onClear();
  }

  onClear(): void {
    this.form.reset();
    this.isEditMode = false;
    this.store.dispatch(new StopEditAction());
  }

  onDelete(): void {
    this.store.dispatch(new DeleteIngredientAction());
    this.onClear();
  }
}
