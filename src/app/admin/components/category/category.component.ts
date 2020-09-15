import {Component, OnInit} from '@angular/core';
import {ResourceService} from '../../services/resource.service';
import {Router} from "@angular/router";
import {AuthService} from "../../../services/auth.service";
import {CategoryModel} from "../../../models/Category.model";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  public categories;
  public nbPages:number=0;
  public size:number=4;
  public totalPages;
  public pages=Array();
  public d;
  public catToSearch;
  public resTrouvee = false;
  constructor(
    private resourceService: ResourceService,
    public authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.onLoadCats();
  }
  onSearchCat(){
    let cats = this.d._embedded.categories;
    if (this.catToSearch){
      let results= cats.filter(x => x.name.toLowerCase().includes(this.catToSearch.toLowerCase()));
      this.categories = results
      this.resTrouvee = true;
    }
    else {this.onLoadCats();this.resTrouvee = false;}

  }
  goToPage(i){
    this.nbPages = i;
    console.log(this.nbPages)
    this.onLoadCats()
  }
  onLoadCats() {
    this.resourceService.getResource('categories?sort=id,desc&&page='+this.nbPages+'&size='+this.size).subscribe(
      (data) => {
        this.d = data;
        this.categories = this.d._embedded.categories;
        this.totalPages = this.d.page.totalPages;
        this.pages= new Array(this.totalPages)
      },
      (err) => {
        this.authService.logout();
        this.router.navigateByUrl("/login");
      }
    );
  }

  onAddCat(datForm: CategoryModel) {
    this.resourceService.addResource(datForm, "categories")
      .subscribe(
        (data) => {

          alert("la categorie " + datForm.name + " ete bien ajoutee...");
          this.onLoadCats();
        },
        (err) => {
          alert("Ressayer a nouveau...");
        }
      );
  }

  onDeleteCat(cat) {
    if (confirm("Vous etes sur....?")) {
      this.resourceService.deleteResource('categories/' + cat.id).subscribe(
        (data) => {
          //
          // alert("la categorie "+cat.name+" ete bien supprimee...");
          this.onLoadCats();
        },
        (err) => {
          alert("Ressayer a nouveau...");
        }
      );
    }
  }

}
