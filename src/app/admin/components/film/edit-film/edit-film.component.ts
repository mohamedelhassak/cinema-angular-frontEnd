import { Component, OnInit } from '@angular/core';
import {FilmModel} from "../../../../models/Film.model";
import {ResourceService} from "../../../services/resource.service";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../../../services/auth.service";
import {CinemaService} from "../../../../services/cinema.service";
import {FilmService} from "../../../services/film.service";

@Component({
  selector: 'app-edit-film',
  templateUrl: './edit-film.component.html',
  styleUrls: ['./edit-film.component.css']
})
export class EditFilmComponent implements OnInit {
   errorMessage;
   film;
  categories;
  selectedFile: File;
  imgURL: any;
  id;
  sub;
  constructor(private resourceService: ResourceService,
              private router: Router,
              private httpClient: HttpClient,
              private route:ActivatedRoute,
              private authService:AuthService,
              private cinemaService:CinemaService,
              private filmService:FilmService) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params=>{
      this.id =+ params['id'] ;
    })

    this.onLoadFilm()
    this.onLoadCats()
    this.imgURL = this.cinemaService.HOST +'getImageFilm/' +this.id
  }

  onLoadCats() {
    this.resourceService.getResource('categories').subscribe(
      (data) => {
        this.categories =   data;
        console.log("cats from film service"+data);
      },
      (err) => {
        console.log(err)
      }
    );
  }

  onLoadFilm(){
    this.resourceService.getResource('films/'+this.id+"?projection=filmsProj").subscribe(
      (data) => {
        this.film = data;
        console.log(this.film);
      },
      (err) => {
        this.authService.logout();
        this.router.navigateByUrl("/login");
      }
    );
  }

  onRetoutToList() {
    this.router.navigateByUrl("/admin/films")
  }

  onFileChanged(event) {
    let f = this.filmService.onFileChanged(event);
    this.selectedFile =f;
    let reader = new FileReader();
    reader.readAsDataURL(f);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    };
  }

  onEditFim(dataForm:FilmModel){
    const film = dataForm;
    const uploadData = new FormData();


    uploadData.append('file',this.selectedFile);


    uploadData.append('film', JSON.stringify(film));
    this.resourceService.updateResource(uploadData, "films/updateFilm/"+this.id)
      .subscribe(
        (data) => {
          alert("le film " + dataForm.titre + " ete bien modifie...");
          this.router.navigateByUrl("/admin/films")
        },
        (err) => {
          this.errorMessage = "un erreur occure ..ressayer";
          console.log(err.error.message);
        }
      );
  }

}
