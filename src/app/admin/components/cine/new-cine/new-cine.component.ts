import { Component, OnInit } from '@angular/core';
import {ResourceService} from "../../../services/resource.service";
import {Router} from "@angular/router";
import {FilmService} from "../../../services/film.service";

@Component({
  selector: 'app-new-cine',
  templateUrl: './new-cine.component.html',
  styleUrls: ['./new-cine.component.css']
})
export class NewCineComponent implements OnInit {
  villes
  errorMessage: string;
  constructor(private resourceService: ResourceService,
              private router: Router,
              private  filmService: FilmService) {
  }

  ngOnInit(): void {
    this.onLoadVilles();
  }

  onRetoutToList() {
    this.router.navigateByUrl("/admin/cinemas")
  }

  onLoadVilles(){
    this.resourceService.getResource('villes').subscribe(
      (data) => {
        this.villes =   data;
      },
      (err) => {
        console.log(err)
      }
    );
  }

  onAddCine(dataForm){
    const cine = dataForm;
    console.log(dataForm)
    const uploadData = new FormData();
    uploadData.append('cine', JSON.stringify(cine));
    this.resourceService.addResource(uploadData, "cinemas/addCine")
      .subscribe(
        (data) => {
          alert("le cinema " + dataForm.name + " ete bien ajoute...");
          this.router.navigateByUrl("/admin/cinemas")
        },
        (err) => {
          this.errorMessage = "un erreur occure ..ressayer";
          console.log(err.error.message);
        }
      );
  }

}
