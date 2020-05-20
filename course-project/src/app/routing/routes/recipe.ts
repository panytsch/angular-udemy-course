import {IAppRoute, RoutesEnum} from './types';
import {Route} from '@angular/router';
import {RecipesComponent} from '../../recipes/recipes.component';

export class RecipeRoute implements IAppRoute{
  getRoute = (): Route => ({
    path: RoutesEnum.Recipe.substr(1),
    component: RecipesComponent
  })
}
