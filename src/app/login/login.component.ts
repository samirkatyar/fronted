import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Route, Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  cred = {
    email:"",
    password:""
  }
  constructor(private _snackBar: MatSnackBar,private http: HttpClient, private route: Router) {}

  ngOnInit(): void {
  }
  doLogin(){
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(this.cred.email.trim() && this.cred.password.trim() && re.test(this.cred.email.trim())){
          this.http.post(environment.BACKED_URL+"login/",this.cred).subscribe(((res:any)=>{
            localStorage.setItem("token",res.token)
            this.route.navigate(['dashboard'])
          }), (err:any)=>{
            console.log(err)
            this.openSnackBar(err.error.message)
          })
    } else {
      if(!this.cred.email.trim()) {
        return this.openSnackBar("Enter Email")
      }
      if(!re.test(this.cred.email.trim())) {
        return this.openSnackBar("Enter valid Email")
      }
      if(!this.cred.password.trim()) {
        return this.openSnackBar("Enter password")
      }
    }
    console.log(this.cred)
  }
  openSnackBar(string: string) {
    this._snackBar.open(string);
  }
}
