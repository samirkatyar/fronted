import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categoryData: any = [];
  category: any = {
    title:"",
    description:"",
    status:"",
    parentCategory:null
  }
  parentCategory: any = {
    title:"",
    description:"",
    status:"",
    parentCategory:null
  }

  constructor(public dialog: MatDialog,private http: HttpClient,private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.getCategory()
  }

  addCategory(tempRef: any,category?:any): void {
    this.category = {
      title:"",
      description:"",
      status:"",
      parentCategory:null
    }
    if(category){
      this.category = JSON.parse(JSON.stringify(category))
    }
    this.dialog.open(tempRef, {
      width: "40vw"
    });
  }


  addSubCategory(tempRef: any,category?:any): void {
    this.parentCategory = {
      title:"",
      description:"",
      status:"",
      parentCategory:null
    }
    this.category = {
      title:"",
      description:"",
      status:"",
      parentCategory:null
    }
    if(category){
      this.parentCategory = JSON.parse(JSON.stringify(category))
    }
    this.dialog.open(tempRef, {
      width: "40vw"
    });
  }

  getCategory(id?: string | null){
    let url = "";
    if(id){
      url = environment.BACKED_URL+"category/"+id
    } else {
      url = environment.BACKED_URL+"category/"
    }
    let token :any= localStorage.getItem('token') ? localStorage.getItem('token') : ""

    this.http.get(url,{responseType: 'json', headers: new HttpHeaders().set('authorization',token)}).subscribe(((res:any)=>{
      this.categoryData = res.data
    }), (err:any)=>{
      console.log(err)
      this.openSnackBar(err.error.message)
    })
  }

  openSnackBar(string: string) {
    this._snackBar.open(string);
  }

  createCategory() {
    let token :any= localStorage.getItem('token') ? localStorage.getItem('token') : ""
    let request
    const category = {
      title:this.category.title,
      description:this.category.description,
      status:this.category.status,
      parentCategory:this.category.parentCategory
    }
      if(!this.category._id){
        request = this.http.post(environment.BACKED_URL+"category/", category,{responseType: 'json', headers: new HttpHeaders().set('authorization',token)})
      } else {
        request = this.http.put(environment.BACKED_URL+"category/"+this.category._id, this.category,{responseType: 'json', headers: new HttpHeaders().set('authorization',token)})
      }
    request.subscribe(((res:any)=>{
      this.openSnackBar(this.category._id? "category updated successfully" :"category created successfully")
      this.getCategory();
    }), (err:any)=>{
      console.log(err)
      this.openSnackBar(err.error.message)
    })
  }

  createChield() {
    let token :any= localStorage.getItem('token') ? localStorage.getItem('token') : ""
    let request
    const category = {
      title:this.category.title,
      description:this.category.description,
      status:this.category.status,
      parentCategory:this.parentCategory._id
    }
    request = this.http.post(environment.BACKED_URL+"category/", category,{responseType: 'json', headers: new HttpHeaders().set('authorization',token)})

    request.subscribe(((res:any)=>{
      this.openSnackBar(this.category._id? "category updated successfully" :"category created successfully")
      this.getCategory();
    }), (err:any)=>{
      console.log(err)
      this.openSnackBar(err.error.message)
    })
  }
  deleteCategory(id:string) {
    let token :any= localStorage.getItem('token') ? localStorage.getItem('token') : ""
    this.http.delete(environment.BACKED_URL+"category/"+ id,{responseType: 'json', headers: new HttpHeaders().set('authorization',token)}).subscribe(((res:any)=>{
      this.getCategory();
    }), (err:any)=>{
      console.log(err)
      this.openSnackBar(err.error.message)
    })
  }
}
