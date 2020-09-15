import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import jwt_decode from "jwt-decode";
import {Router} from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private host: string = "http://localhost:9093/";
  private jwtToken: string;
  private roles: Array<any> = [];
  public username: string = "";
  public isLogged: boolean = false;

  constructor(private http: HttpClient,
              private router: Router) {
    if (this.loadToken() != null) {
      this.isLogged = true;
      this.roles = jwt_decode(this.jwtToken).roles;
    }

  }

  login(user) {
    return this.http.post(this.host + "login", user, {
      observe: 'response'
    });
  }

  register(user) {
    return this.http.post(this.host + "register", user);
  }

  saveToken(jwtToken) {
    this.jwtToken = jwtToken;
    localStorage.setItem("token", jwtToken);
    if (this.jwtToken) {
      this.roles = jwt_decode(this.jwtToken).roles;
      this.username = jwt_decode(this.jwtToken).sub;
    }
    this.isLogged = true;
  }

  loadToken() {
    this.jwtToken = localStorage.getItem('token');
    if (this.jwtToken) this.username = jwt_decode(this.jwtToken).sub;
    return this.jwtToken;
  }

  logout() {
    localStorage.removeItem('token');
    this.isLogged = false;
    this.username = "";
    this.roles = [];
    this.router.navigateByUrl("/login");
  }

  isAdmin() {
    for (let r of this.roles) {
      if (r.authority == 'ADMIN') return true;
    }
    return false;
  }
}
