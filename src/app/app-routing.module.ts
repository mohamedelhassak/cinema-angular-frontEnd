import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CinemaComponent} from './components/cinema/cinema.component';
import {FilmComponent} from './admin/components/film/film.component';
import {CategoryComponent} from './admin/components/category/category.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {NewFilmComponent} from "./admin/components/film/new-film/new-film.component";
import {EditFilmComponent} from "./admin/components/film/edit-film/edit-film.component";
import {VilleComponent} from "./admin/components/ville/ville.component";
import {CineComponent} from "./admin/components/cine/cine.component";
import {NewCineComponent} from "./admin/components/cine/new-cine/new-cine.component";
import {EditCineComponent} from "./admin/components/cine/edit-cine/edit-cine.component";

const routes: Routes = [
  {
    path: '',
    component: CinemaComponent,
  },
  {
    path: 'admin/categories',
    component: CategoryComponent,
  },
  {
    path: 'admin/villes',
    component: VilleComponent,
  },
  {
    path: 'admin/cinemas',
    component: CineComponent,
  },
  {
    path: 'admin/new-cine',
    component: NewCineComponent,
  },
  {
    path: 'admin/edit-cine/:id',
    component: EditCineComponent,
  },
  {
    path: 'admin/films',
    component: FilmComponent,
  },
  {
    path: 'admin/new-film',
    component: NewFilmComponent,
  },
  {
    path: 'admin/edit-film/:id',
    component: EditFilmComponent,
  },

  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
