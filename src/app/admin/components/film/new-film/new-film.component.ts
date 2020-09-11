import {Component, OnInit} from '@angular/core';
import {ResourceService} from "../../../services/resource.service";
import {FilmModel} from "../../../../models/Film.model";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {FilmService} from "../../../services/film.service";

@Component({
  selector: 'app-new-film',
  templateUrl: './new-film.component.html',
  styleUrls: ['./new-film.component.css']
})
export class NewFilmComponent implements OnInit {
  errorMessage: string;
  categories;
  selectedFile: File;
  imgURL: any;

  constructor(private resourceService: ResourceService,
              private router: Router,
              private  filmService: FilmService) {
  }

  ngOnInit(): void {
    this.onLoadCats();
  }

  onRetoutToList() {
    this.router.navigateByUrl("/admin/films")
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

  onFileChanged(event) {
    let f = this.filmService.onFileChanged(event);
    this.selectedFile =f;
    let reader = new FileReader();
    reader.readAsDataURL(f);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    };
  }


  onAddFim(dataForm: FilmModel) {
    const film = dataForm;
    const uploadData = new FormData();
    uploadData.append('file', this.selectedFile);
    uploadData.append('film', JSON.stringify(film));
    this.resourceService.addResource(uploadData, "films/addFilm")
      .subscribe(
        (data) => {
          alert("le film " + dataForm.titre + " ete bien ajoute...");
          this.router.navigateByUrl("/admin/films")
        },
        (err) => {
          this.errorMessage = "un erreur occure ..ressayer";
          console.log(err.error.message);
        }
      );

  }


}
