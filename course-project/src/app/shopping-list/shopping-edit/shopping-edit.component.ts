import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ingredient} from '../../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  private indexChangedSubs: Subscription;
  ingredientIndex?: number = null;
  form: FormGroup;
  isEditMode = false;

  constructor(private shoppingListService: ShoppingListService) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      amount: new FormControl(null, this.validateAmount),
    });
    this.indexChangedSubs = this.shoppingListService.ingredientToEditChanged.subscribe(this.nextIngredient);
  }

  private nextIngredient = (index: number): void => {
    const ingredient = this.shoppingListService.ingredients[index];
    if (!ingredient) {
      return;
    }
    this.ingredientIndex = index;
    this.isEditMode = true;
    this.form.setValue({
      name: ingredient.name,
      amount: ingredient.amount
    });
  }

  ngOnDestroy() {
    this.indexChangedSubs.unsubscribe();
  }

  validateAmount = (control: FormControl) => control.value > 0 ? null : {lowValue: true};

  onSubmit = (): void => {
    if (this.form.invalid) {
      return;
    }
    const ingredient = new Ingredient(this.form.value.name, this.form.value.amount);
    if (this.isEditMode) {
      this.shoppingListService.patchIngredient(this.ingredientIndex, ingredient);
    } else {
      this.shoppingListService.addIngredient(ingredient);
    }
    this.onClear();
  }

  onClear(): void {
    this.form.reset();
    this.isEditMode = false;
    this.ingredientIndex = null;
  }

  onDelete(): void {
    this.shoppingListService.removeIngredient(this.ingredientIndex);
    this.onClear();
  }
}
