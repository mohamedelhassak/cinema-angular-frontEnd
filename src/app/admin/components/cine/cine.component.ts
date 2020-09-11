import { Component, OnInit } from '@angular/core';
import {ResourceService} from "../../services/resource.service";
import {CinemaService} from "../../../services/cinema.service";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-cine',
  templateUrl: './cine.component.html',
  styleUrls: ['./cine.component.css']
})
export class CineComponent implements OnInit {

  public cinemas;
  public nbPages:number=0;
  public size:number=4;
  public totalPages;
  public pages=Array()
  constructor(
    private resourceService: ResourceService,
    private cinemaService: CinemaService,
    public authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.onLoadCinemass()
  }
  goToPage(i){
    this.nbPages = i;
    console.log(this.nbPages)
    this.onLoadCinemass()
  }

  onLoadCinemass() {
    this.resourceService.getResource('cinemas?sort=id,desc&page='+this.nbPages+'&size='+this.size+'&projection=CinemasProj').subscribe(
      (data) => {
        this.cinemas = data;
        this.totalPages = this.cinemas.page.totalPages;
        this.pages= new Array(this.totalPages)
      },
      (err) => {
        this.authService.logout();
        this.router.navigateByUrl("/login");
      }
    );
  }

  onNewCinema() {
    this.router.navigateByUrl('admin/new-cine');
  }
  onEditCinema(id) {
    this.router.navigate(['admin/edit-cine',id]);
  }

  onDeleteCinema(c) {
    if (confirm("vous etes sur..?")) {
      this.resourceService.deleteResource('cinemas/' + c.id).subscribe(
        (data) => {
          //
          // alert("le film "+film.titre+" ete bien supprimee...");
          this.onLoadCinemass();
        },
        (err) => {
          alert("Ressayer a nouveau...");
        }
      );
    }
  }


}
