import { Component, OnInit } from '@angular/core';
import {ResourceService} from "../../../services/resource.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FilmService} from "../../../services/film.service";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../../../services/auth.service";
import {CinemaService} from "../../../../services/cinema.service";

@Component({
  selector: 'app-edit-cine',
  templateUrl: './edit-cine.component.html',
  styleUrls: ['./edit-cine.component.css']
})
export class EditCineComponent implements OnInit {

  villes
  errorMessage: string;
  cine;
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
    this.onLoadVilles();
    this.onLoadCine()
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
  onLoadCine(){
    this.resourceService.getResource('cinemas/'+this.id+"?projection=CinemasProj").subscribe(
      (data) => {
        this.cine = data;
        console.log(this.cine);
      },
      (err) => {
        this.authService.logout();
        this.router.navigateByUrl("/login");
      }
    );
  }
  onEditCine(dataForm){
    console.log(dataForm)
    const cine = dataForm;
    const uploadData = new FormData();
    uploadData.append('cine', JSON.stringify(cine));
    this.resourceService.updateResource(uploadData, "cinemas/updateCine/"+this.id)
      .subscribe(
        (data) => {
          alert("le cimema " + dataForm.name + " ete bien modifie...");
          this.router.navigateByUrl("/admin/cinemas")
        },
        (err) => {
          this.errorMessage = "un erreur occure ..ressayer";
          console.log(err.error.message);
        }
      );
  }

}
