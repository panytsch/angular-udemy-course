import {Component, OnDestroy, OnInit} from '@angular/core';
import {StaticRoutesEnum} from '../routing/routes/types';
import {DataStorageService} from '../shared/data-storage.service';
import {Subscription} from 'rxjs';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private subs: Subscription[] = [];
  isAuthenticated = false;
  routes = StaticRoutesEnum;

  constructor(private dataStorageService: DataStorageService,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.subs.push(this.authService.userUpdated.subscribe(user => {
      this.isAuthenticated = !!user;
    }));
  }

  onSaveRecipes(): void {
    this.dataStorageService.storeRecipes();
  }

  onFetchRecipes(): void {
    this.subs.push(this.dataStorageService.fetchRecipes().subscribe());
  }

  onLogout(): void {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }
}
