import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './pages/normal/user-dashboard/user-dashboard.component';
import { AdminGuard } from './guards/admin.guard';
import { NormalGuard } from './guards/normal.guard';
import { NobackGuard } from './guards/noback.guard';
import { ProfileComponent } from './pages/profile/profile.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { ViewCategoriesComponent } from './pages/admin/view-categories/view-categories.component';
import { AddCategoriesComponent } from './pages/admin/add-categories/add-categories.component';
import { ViewQuizzesComponent } from './pages/admin/view-quizzes/view-quizzes.component';
import { AddQuizComponent } from './pages/admin/add-quiz/add-quiz.component';
import { UpdateQuizesComponent } from './pages/admin/update-quizes/update-quizes.component';
import { ViewQuestionsComponent } from './pages/admin/view-questions/view-questions.component';
import { AddQuestionComponent } from './pages/admin/add-question/add-question.component';
import { LoadQuizComponent } from './pages/normal/load-quiz/load-quiz.component';
import { InstructionsComponent } from './pages/normal/instructions/instructions.component';
import { StartComponent } from './pages/normal/start/start.component';
import { UpdateProfileComponent } from './pages/update-profile/update-profile.component';

const routes: Routes = [


  {
    path:'',
    component:HomeComponent,
    canActivate:[NobackGuard],
  
  },
  {
    path:'signup',
    component:SignupComponent,
    pathMatch:'full',
    canActivate:[NobackGuard],

  },
  {
    path:'login',
    component:LoginComponent,
    pathMatch:'full',
    canActivate:[NobackGuard],

  },
  {
    path:'admin-dashboard',
    component:AdminDashboardComponent,
    canActivate:[AdminGuard],
    children:[{
      path:'profile',
      component:ProfileComponent,
    },
    {
      path:'update-profile/:username',
      component:UpdateProfileComponent,
    },
    {
      path:'',
      component:WelcomeComponent,
    },
    {
      path:'categories',
      component:ViewCategoriesComponent,
    },
    {
      path:'add-category',
      component:AddCategoriesComponent,
    },
    {
      path:'quizzes',
      component:ViewQuizzesComponent,
    },
    {
      path:'add-quiz',
      component:AddQuizComponent,
    },
    {
      path:'quiz/:quizId',
      component:UpdateQuizesComponent,
    },
    {
      path:'view-questions/:id/:title',
      component:ViewQuestionsComponent,
    },
    {
      path:'add-question/:id',
      component:AddQuestionComponent,
    },
    ],
  },
  {
    path:'user-dashboard',
    component:UserDashboardComponent,
    canActivate:[NormalGuard],
    children:[
      {
        path:'loadQuiz/:catId',
        component:LoadQuizComponent
      },
      {
        path:'instructions/:quizId',
        component:InstructionsComponent
      },
      {
        path:'profile',
        component:ProfileComponent,
      },
      {
        path:'update-profile/:username',
        component:UpdateProfileComponent,
      },
      
    ],

  },
  {
    path:'start/:quizId',
    component:StartComponent,
    canActivate:[NormalGuard],
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
