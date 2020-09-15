import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {UtilService} from "../../services/util.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public mode = 0;
  errorMessage: string;

  constructor(private authService: AuthService,
              private router: Router,
              private utilService: UtilService) {
  }

  ngOnInit() {
    let token = this.authService.loadToken();
    if (token)
      this.router.navigateByUrl("/");
  }

  onLogin(formData) {
    this.authService.login(formData)
      .subscribe(resp => {
          let jwtToken = resp.headers.get('authorization');
          this.authService.saveToken(jwtToken);
          this.router.navigateByUrl("/");
          this.showSuccess("Bienvenu "+this.authService.username);
        },
        err => {
          this.showError(err.error.message);
          // this.showError("veuillez réessayer à nouveau");
          this.mode = 1;
        })
  }

  onRegister() {
    this.router.navigateByUrl("/register");
  }

  showSuccess(msg:string){
    this.utilService.showSuccess(msg,"Message!")
  }
  showError(err:string){
    this.utilService.showError(err,"Erreur!")
  }

}
