import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from 'src/app/services/helper';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http:HttpClient) { }

   public Quizes(){
    return this.http.get(`${baseUrl}/quiz/`);
  }
  public addQuiz(quiz:any) {
    return this.http.post(`${baseUrl}/quiz/`,quiz);
  }

  public deleteQuiz(quizId:number) {
    return this.http.delete(`${baseUrl}/quiz/${quizId}`);
  }

  public getQuizById(quizId:number) {
    return this.http.get(`${baseUrl}/quiz/${quizId}`);
  }
  public updateQuiz(quiz:any) {
    return this.http.put(`${baseUrl}/quiz/`,quiz);
  }

  public getQuizByCategoryId(categoryId:number) {
    return this.http.get(`${baseUrl}/quiz/category/${categoryId}`);
  }
  public getQuizResponse() {
    return this.http.get(`${baseUrl}/quizResponse/`);
  }

}
