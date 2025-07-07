import { Component, OnInit } from '@angular/core';
import { error } from 'console';
import { title } from 'process';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent implements OnInit {
deleteCategory(catgoryId: number) {
  Swal.fire({
    icon:'warning',
    title:'Are you sure you want to delete this quiz?',
    confirmButtonText:'Delete',
    showCancelButton:true,
    cancelButtonText:'Cancel',
    cancelButtonColor:'red'
  }).then((result)=>{
    if (result.isConfirmed) {
      this.category.deleteCategory(catgoryId).subscribe(
        (data:any)=>{
          Swal.fire("Sucess","Quiz is successfully deleted","success");
          this.categories = this.categories.filter((category1:any) => category1.categoryId != catgoryId )
        },
        (error)=>{
          Swal.fire("Error","Error in loading data","error");
        }
      )
    }
  })
}

  categories:any ;

  constructor(private category:CategoryService) { }

  ngOnInit(): void {
    this.category.categories().subscribe(
      (data:any)=>{
        this.categories=data;
      },
      (error)=>{
        Swal.fire("Error","Error in loading data","error");
      }
    )
  }

}
