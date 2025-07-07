import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { title } from 'process';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-add-categories',
  templateUrl: './add-categories.component.html',
  styleUrls: ['./add-categories.component.css']
})
export class AddCategoriesComponent implements OnInit {

  category={
    title:'',
    description:''
  }

  constructor(private categoryService:CategoryService,private snack:MatSnackBar,private router:Router) { }

  ngOnInit(): void {
  }
  formSubmit() {
    this.categoryService.addCategory(this.category).subscribe(
      (data:any) => {
        if (data.error != null) {
          this.snack.open(data.error,'Ok!',{
            duration:5000,
          })
        } else {
          const snackBarRef=this.snack.open("Category Added Successfully",'Ok!',)
          snackBarRef.onAction().subscribe(() => {
            this.router.navigate(['/admin-dashboard/categories']); // Replace with your target route
          });
        }
      },
      (error) => {
        this.snack.open("Something went wrong",'',{
          duration:3000,
        })
      }
    );
  }

}
