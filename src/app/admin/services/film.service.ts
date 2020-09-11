import { Injectable } from '@angular/core';
import {ResourceService} from "./resource.service";

@Injectable({
  providedIn: 'root'
})
export class FilmService {
  public imgUrl;
  constructor(private resourceService:ResourceService) { }

  onFileChanged(event) {
    const file = event.target.files[0];
    let mimeType = event.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      alert("choisir un image svp...");
      return;
    }
      return file;
  }

}
