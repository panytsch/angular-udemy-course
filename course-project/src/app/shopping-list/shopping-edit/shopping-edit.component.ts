import {Component, OnInit} from '@angular/core';
import {Ingredient} from '../../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  form: FormGroup;

  constructor(private shoppingListService: ShoppingListService) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      amount: new FormControl(null, this.validateAmount),
    });
  }

  validateAmount = (control: FormControl) => control.value > 0 ? null : {lowValue: true};

  onIngredientAdd = (): void => {
    if (this.form.invalid) {
      return;
    }
    this.shoppingListService.addIngredient(new Ingredient(this.form.value.name, this.form.value.amount));
    this.form.reset();
  }
}
