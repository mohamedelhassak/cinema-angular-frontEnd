import { Injectable } from '@angular/core';
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(private toastr: ToastrService) {
  }


  showSuccess(msg:string,title:string) {
    this.toastr.success(msg, title,{closeButton:true,timeOut:1000,easeTime:600});
  }


  showError(msg:string,title:string) {
    this.toastr.error(msg, title,{closeButton:true,timeOut:5000,easeTime:1000});
  }
  showInfo(msg:string,title:string){
    this.toastr.info(msg, title,{closeButton:true,timeOut:5000,easeTime:1000});
  }

  showWarning(msg:string,title:string){
    this.toastr.warning(msg, title,{closeButton:true,timeOut:5000,easeTime:1000});
  }
}
