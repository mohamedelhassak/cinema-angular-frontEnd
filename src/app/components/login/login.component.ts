import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public mode = 0;
  errorMessage: string;

  constructor(private authService: AuthService,
              private router: Router) {
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
          console.log(this.authService.isAdmin());
          this.router.navigateByUrl("/");
        },
        err => {
          this.errorMessage = err.error.message;
          this.mode = 1;
        })
  }

  onRegister() {
    this.router.navigateByUrl("/register");
  }

}
