import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from "@angular/router";
import {UtilService} from "../../services/util.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: any;
  mode: number = 0;
  errorMessage: string;

  constructor(private authService: AuthService,
              private router: Router,
              private utilService:UtilService) {
  }

  ngOnInit() {
  }
  onRetourToLogin(){
    this.router.navigateByUrl("/login")
  }
  onRegister(user) {
    this.authService.register(user)
      .subscribe(data => {
          this.user = data;
          this.mode = 1;
          this.router.navigateByUrl("/login");
          this.showSuccess("votre compte est bien créé.")
        },
        err => {
          // this.errorMessage = err.error.message;
          this.showError(err.error.message);
          this.mode = 0;
        })
  }


  showSuccess(msg:string){
    this.utilService.showSuccess(msg,"Message!")
  }
  showError(err:string){
    this.utilService.showError(err,"Erreur!")
  }

}
