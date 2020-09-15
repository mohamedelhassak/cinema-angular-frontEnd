import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {UtilService} from "../../services/util.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public authService: AuthService,
              private utilService:UtilService ) {
  }

  ngOnInit(): void {
  }

  logout(){
    this.authService.logout();
    this.showWarning("Nous attandant votre retour")
  }
  showWarning(err:string){
    this.utilService.showWarning(err,"Message!")
  }

}
