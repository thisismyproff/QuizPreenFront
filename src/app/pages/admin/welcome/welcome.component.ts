import { Component, OnInit } from '@angular/core';
import { Console, error } from 'console';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';
import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  quiz:any;
  quizResponse:any;
  displayedColumns = ['quizId', 'title', 'category.title', 'attempts'];
  displayedColumns1 = ['quizId', 'userId', 'quizTitle', 'percentageObtained'];
  dataSource: any;
  dataSource1: any;
  

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  applyFilter1(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource1.filter = filterValue.trim().toLowerCase();
  }

  constructor(private quizService:QuizService) { }

  ngOnInit(): void {
    this.quizService.Quizes().subscribe(
      (data:any) => {
        this.quiz=data;
        this.dataSource = new MatTableDataSource(this.quiz);

      },
      (error) => {
        Swal.fire("Error","Something went wrong while fetching Quiz data","error")
      }
    )
    this.quizService.getQuizResponse().subscribe(
      (data:any) => {
        this.quizResponse=data;
        console.log(this.quizResponse)
        this.dataSource1=new MatTableDataSource(this.quizResponse)
      },
      (error) => {
        Swal.fire("Error","Something went wrong while fetching Quiz Response data","error")
      }
    )

  }

}
