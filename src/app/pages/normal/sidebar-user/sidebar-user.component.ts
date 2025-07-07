import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-sidebar-user',
  templateUrl: './sidebar-user.component.html',
  styleUrls: ['./sidebar-user.component.css']
})
export class SidebarUserComponent implements OnInit {
getProfile() {
  this.router.navigate(['/user-dashboard/profile']);
}

  categories:any;

  constructor(private categoryService:CategoryService,private snack:MatSnackBar,private router:Router) { }

  ngOnInit(): void {
    this.categoryService.categories().subscribe(
      (data:any) => {
        this.categories=data;
      },
      (error) => {
        this.snack.open("Something went wrong, Please log out and log in again","",{duration:4000});
      }
    )
  }
}
