import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from '../../recipe.model';
import {SelectedRecipeRoute} from '../../../routing/routes/recipe';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input()
  recipe: Recipe;
  @Input()
  index: number;
  detailLink: string;

  constructor() {
  }

  ngOnInit(): void {
    this.detailLink = SelectedRecipeRoute.getLink(this.index);
  }
}
