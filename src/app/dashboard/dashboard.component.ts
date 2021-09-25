import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  showCategory = true
  constructor(
    readonly router: Router,
  ) { }

  ngOnInit(): void {
  }

  Logout() {
    localStorage.clear();
    this.router.navigate(["login"])
  }
}
