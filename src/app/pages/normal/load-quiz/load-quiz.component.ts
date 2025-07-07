import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from './../../../services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent implements OnInit {
  quizes:any
  catId:number=0;

  constructor(private route:ActivatedRoute,private quizService:QuizService) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params) => {
        this.catId = params['catId'];
        if (this.catId==0) {
          this.quizService.Quizes().subscribe(
            (data:any)=>{
              this.quizes=data;
              this.quizes=this.quizes.filter((quiz:any) => quiz.active !=false);
            },
            (error)=>{
              Swal.fire("Error","Error in loading data","error");
            }
          )
        } else {
          this.quizService.getQuizByCategoryId(this.catId).subscribe(
            (data:any)=>{
              this.quizes=data;
              this.quizes=this.quizes.filter((quiz:any) => quiz.active !=false);
            },
            (error)=>{
              Swal.fire("Error","Error in loading data","error");
            }
          )
        }
      }
    )
    
  }

}
