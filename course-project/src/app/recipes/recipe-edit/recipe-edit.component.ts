import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {Recipe} from '../recipe.model';
import {Ingredient} from '../../shared/ingredient.model';
import {RecipeRoute, SelectedRecipeRoute} from '../../routing/routes/recipe';
import {Store} from '@ngrx/store';
import {IAppState} from '../../store/app.reducer';
import {Subscription} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AddRecipeAction, UpdateRecipeAction} from '../store/recipe.actions';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  private subs: Subscription[] = [];
  form: FormGroup;
  id: number;
  recipe?: Recipe;
  isEditMode = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private store: Store<IAppState>) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(this.nextLoad);
  }

  get controls(): FormArray {
    return (this.form.get('ingredients') as FormArray);
  }

  private nextLoad = (params: Params): void => {
    this.id = +params.id;
    this.isEditMode = !!params.id;
    // this.recipe = this.recipeService.getRecipeById(this.id);
    this.subs.push(
      this.store.select('recipes')
        .pipe(
          map(state => state.recipes.find((_, i) => i === this.id)),
          tap(recipe => this.recipe = recipe)
        )
        .subscribe(this.initForm)
    );
  }

  private initForm = (): void => {
    const ingredients = new FormArray([]);
    if (this.recipe && this.recipe.ingredients) {
      this.recipe.ingredients.forEach((ing: Ingredient) => ingredients.push(this.getIngredient(ing.name, ing.amount)));
    }
    this.form = new FormGroup({
      name: new FormControl(this.recipe && this.recipe.name, Validators.required),
      imagePath: new FormControl(this.recipe && this.recipe.imagePath, Validators.required),
      description: new FormControl(this.recipe && this.recipe.description, Validators.required),
      ingredients
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    if (!this.isEditMode) {
      this.store.dispatch(new AddRecipeAction(this.getRecipeFromForm()));
    } else {
      this.store.dispatch(new UpdateRecipeAction(this.getRecipeFromForm(), this.id));
    }
    this.redirectToRecipe(!this.isEditMode);
  }

  private getRecipeFromForm(): Recipe {
    const {name, imagePath, description, ingredients} = this.form.value;
    return new Recipe(name, description, imagePath, ingredients.map(i => new Ingredient(i.name, i.amount)));
  }

  onAddIngredients(): void {
    this.controls.push(this.getIngredient());
  }

  private getIngredient = (name?: string, amount?: number): FormGroup => new FormGroup({
    name: new FormControl(name, Validators.required),
    amount: new FormControl(amount, [Validators.required, Validators.min(1)]),
  })

  onRemoveIngredient(index: number): void {
    this.controls.removeAt(index);
  }

  redirectToRecipe(toList: boolean): void {
    if (toList) {
      this.router.navigateByUrl(RecipeRoute.getLink());
    } else {
      this.router.navigateByUrl(SelectedRecipeRoute.getLink(this.id));
    }
  }

  onCancel(): void {
    this.redirectToRecipe(!this.isEditMode);
  }

  ngOnDestroy() {
    this.subs.forEach(s => s.unsubscribe());
  }
}
