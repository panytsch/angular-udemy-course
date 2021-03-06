import {Component, OnDestroy, OnInit} from '@angular/core';
import {Recipe} from '../recipe.model';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {EditRecipeRoute, RecipeRoute} from '../../routing/routes/recipe';
import {Store} from '@ngrx/store';
import {IAppState} from '../../store/app.reducer';
import {map} from 'rxjs/operators';
import {Subscription} from 'rxjs';
import {IRecipeState} from '../store/recipe.reducer';
import {DeleteRecipeAction} from '../store/recipe.actions';
import {AddIngredientsAction} from '../../shopping-list/store/shopping-list.actions';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  private subs: Subscription[] = [];
  recipe: Recipe;
  id: number;
  editRecipeLink: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private store: Store<IAppState>) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(this.loadNext);
  }

  private loadNext = (params: Params): void => {
    this.id = +params.id;
    this.subs.push(this.store.select('recipes')
      .pipe(
        map((state: IRecipeState): Recipe => state.recipes.find((_, index) => index === this.id))
      )
      .subscribe((r: Recipe) => {
        this.recipe = r;
      })
    );
    this.editRecipeLink = EditRecipeRoute.getLink(this.id);
  }

  toShoppingList(): void {
    this.store.dispatch(new AddIngredientsAction(this.recipe.ingredients));
  }

  onDelete(): void {
    this.store.dispatch(new DeleteRecipeAction(this.id));
    this.router.navigateByUrl(RecipeRoute.getLink());
  }

  ngOnDestroy() {
    this.subs.forEach(s => s.unsubscribe());
  }
}
