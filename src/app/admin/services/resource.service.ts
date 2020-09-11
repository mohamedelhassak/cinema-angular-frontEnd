import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from "../../services/auth.service";


@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  public HOST: String = 'http://localhost:9093/';
  public token;

  constructor(private httpClient: HttpClient,
              private authService: AuthService) {
    this.token = authService.loadToken();
  }

  public getResource(path: String) {
    if (this.token == null) this.token = this.authService.loadToken();
    console.log(this.token);
    return this.httpClient.get(this.HOST + "" + path, {
      headers: new
      HttpHeaders({'authorization': this.token, 'Access-Control-Allow-Origin': '*'})
    });

  }


  public addResource(data, path: String) {
    console.log(this.token);
    return this.httpClient.post(this.HOST + "" + path, data, {
      headers: new
      HttpHeaders({'authorization': this.token, 'Access-Control-Allow-Origin': '*'})
    });

  }

  public updateResource(data, path: String) {
    console.log(this.token);
    return this.httpClient.put(this.HOST + "" + path, data, {
      headers: new
      HttpHeaders({'authorization': this.token, 'Access-Control-Allow-Origin': '*'})
    });

  }




  public deleteResource(path: String) {
    return this.httpClient.delete(this.HOST + "" + path, {
      headers: new
      HttpHeaders({'authorization': this.token, 'Access-Control-Allow-Origin': '*'})
    });
  }
}
