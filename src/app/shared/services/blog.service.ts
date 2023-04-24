import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponsePageable } from "../models/responsePageable.model";
import {EmailModel} from "../models/email.model";
import {UserModel} from "../models/user.model";
import {DictionaryModel} from "../models/dictionary.model";

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  apiUrl = 'http://localhost:8087';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(
    private httpClient: HttpClient
  ) {}

  public getAllPosts(): Observable<ResponsePageable> {
    return this.httpClient.get<ResponsePageable>(`${ this.apiUrl }/public/posts`);
  }
  public getDictionaryWord(word: string): Observable<ResponsePageable> {
    return this.httpClient.get<ResponsePageable>(`${this.apiUrl}/dictionaries?word=${word}`)
  }

  public postNewsletter(emailModel: EmailModel): Observable<EmailModel> {
    return this.httpClient.post<EmailModel>(`${ this.apiUrl }/newsletter`, emailModel, this.httpOptions);
  }
  public login(userModel: UserModel): Observable<UserModel> {
    return this.httpClient.post<UserModel>(`${ this.apiUrl }/auth/login`, userModel, this.httpOptions);
  }
}

