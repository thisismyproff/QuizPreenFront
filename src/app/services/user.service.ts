import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http:HttpClient
  ) { }

  // add user

  public addUser(user:any) {
    return this.http.post(`${baseUrl}/user/`,user)
  }
  public updateUser(user:any) {
    return this.http.put(`${baseUrl}/user/`,user)
  }

  public getUser(username:string) {
    return this.http.get(`${baseUrl}/user/${username}`)
  }

}
