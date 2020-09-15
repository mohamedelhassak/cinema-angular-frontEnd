import { Component, OnInit } from '@angular/core';
import {ResourceService} from "../../services/resource.service";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import {CategoryModel} from "../../../models/Category.model";
import {VilleModel} from "../../../models/Ville.model";

@Component({
  selector: 'app-ville',
  templateUrl: './ville.component.html',
  styleUrls: ['./ville.component.css']
})
export class VilleComponent implements OnInit {
  villes;
  villeToSearch;
  public d;
  public resTrouvee = false;
  public nbPages:number=0;
  public size:number=4;
  public totalPages;
  public pages=Array()
  constructor(private resourceService: ResourceService,
              public authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.onLoadVilles();
  }
  goToPage(i){
    this.nbPages = i;
    console.log(this.nbPages)
    this.onLoadVilles()
  }

  onSearchVille(){
    let villes = this.d._embedded.villes;
    if (this.villeToSearch){
      let results= villes.filter(x => x.name.toLowerCase().includes(this.villeToSearch.toLowerCase()));
      this.villes = results
      console.log(results)
      this.resTrouvee = true;
    }
    else {this.onLoadVilles();this.resTrouvee = false;}

  }
  onLoadVilles() {
    this.resourceService.getResource('villes?sort=id,desc&&page='+this.nbPages+'&size='+this.size).subscribe(
      (data) => {
        let villes = data;
        this.d = data;
        this.villes = this.d._embedded.villes;
        this.totalPages = this.d.page.totalPages;
        this.pages= new Array(this.totalPages)      },
      (err) => {
        this.authService.logout();
        this.router.navigateByUrl("/login");
      }
    );
  }

  onAddVille(datForm: VilleModel) {
    this.resourceService.addResource(datForm, "villes")
      .subscribe(
        (data) => {

          alert("la ville " + datForm.name + " ete bien ajoutee...");
          this.onLoadVilles();
        },
        (err) => {
          alert("Ressayer a nouveau...");
        }
      );
  }

  onDeleteCat(ville:VilleModel) {
    if (confirm("Vous etes sur....?")) {
      this.resourceService.deleteResource('villes/' + ville.id).subscribe(
        (data) => {
          //
          // alert("la categorie "+cat.name+" ete bien supprimee...");
          this.onLoadVilles();
        },
        (err) => {
          alert("Ressayer a nouveau...");
        }
      );
    }
  }

}
