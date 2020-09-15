import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CinemaComponent} from './components/cinema/cinema.component';
import {FormsModule} from '@angular/forms';
import {en_US, NZ_I18N} from 'ng-zorro-antd/i18n';
import {registerLocaleData} from '@angular/common';
import en from '@angular/common/locales/en';
import {NgZorroAntdModule, NzLayoutModule} from 'ng-zorro-antd';
import { ToastrModule } from 'ngx-toastr';
import {FilmComponent} from './admin/components/film/film.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {HeaderComponent} from './components/header/header.component';
import {CategoryComponent} from './admin/components/category/category.component';
import {NewFilmComponent} from './admin/components/film/new-film/new-film.component';
import { EditFilmComponent } from './admin/components/film/edit-film/edit-film.component';
import { VilleComponent } from './admin/components/ville/ville.component';
import { CineComponent } from './admin/components/cine/cine.component';
import { NewCineComponent } from './admin/components/cine/new-cine/new-cine.component';
import { EditCineComponent } from './admin/components/cine/edit-cine/edit-cine.component';


registerLocaleData(en);

@NgModule({
  declarations: [AppComponent, FilmComponent, LoginComponent, RegisterComponent, HeaderComponent, CategoryComponent, NewFilmComponent, EditFilmComponent, VilleComponent, CinemaComponent, CineComponent, NewCineComponent, EditCineComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    NgZorroAntdModule,
    NzLayoutModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [{provide: NZ_I18N, useValue: en_US}],
  bootstrap: [AppComponent],
})
export class AppModule {
}
