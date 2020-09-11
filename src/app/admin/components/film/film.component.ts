import {Component, OnInit} from '@angular/core';
import {ResourceService} from '../../services/resource.service';
import {CinemaService} from '../../../services/cinema.service';
import {Router} from "@angular/router";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.css'],
})
export class FilmComponent implements OnInit {
  public films;
  public nbPages:number=0;
  public size:number=3;
  public totalPages;
  public pages=Array()
  constructor(
    private resourceService: ResourceService,
    private cinemaService: CinemaService,
    public authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.onLoadFilms()
  }

  goToPage(i){
    this.nbPages = i;
    console.log(this.nbPages)
    this.onLoadFilms()
  }
  onLoadFilms() {
    this.resourceService.getResource('films?sort=id,desc&&page='+this.nbPages+'&size='+this.size+'&projection=filmsProj').subscribe(
      (data) => {
        this.films = data;
        this.totalPages = this.films.page.totalPages;
        this.pages= new Array(this.totalPages)
      },
      (err) => {
        this.authService.logout();
        this.router.navigateByUrl("/login");
      }
    );
  }

  onNewFilm() {
    this.router.navigateByUrl('admin/new-film');
  }
  onEditFilm(id) {
    this.router.navigate(['admin/edit-film',id]);
  }

  onDeleteFilm(film) {
    if (confirm("vous etes sur..?")) {
      this.resourceService.deleteResource('films/' + film.id).subscribe(
        (data) => {
          //
          // alert("le film "+film.titre+" ete bien supprimee...");
          this.onLoadFilms();
        },
        (err) => {
          alert("Ressayer a nouveau...");
        }
      );
    }
  }
}
