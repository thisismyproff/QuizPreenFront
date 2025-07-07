import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionsService } from 'src/app/services/questions.service';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {

  public Editor = ClassicEditor;
  quizId:number=0;
  question={
    quiz:{
      quizId:0
    },
    content:'',
    option1:'',
    option2:'',
    option3:'',
    option4:'',
    answer:'',

  }

  constructor(private route:ActivatedRoute,private snack:MatSnackBar,private questionsService:QuestionsService,private router:Router) { }

  ngOnInit(): void {

    this.quizId = this.route.snapshot.params['id']
    this.question.quiz['quizId'] = this.quizId;
  }

  formSubmit(){
    if (this.question.answer == null  || this.question.answer == '') {
      this.snack.open("Please select answer of question","Ok")
      return 
    }
    console.log(this.question)
    this.questionsService.addQuestion(this.question).subscribe(
      (data:any) => {
        if (data.error != null) {
          this.snack.open(data.error,'Ok!',{
            duration:5000,
          })
        } else {
          const snackBarRef=this.snack.open("Question Added Successfully",'Ok!',{
            duration:5000,
          })
          snackBarRef.onAction().subscribe(() => {
            this.router.navigate(['/admin-dashboard/quizzes']); // Replace with your target route
          });
        }
      }
    )
  }

}
