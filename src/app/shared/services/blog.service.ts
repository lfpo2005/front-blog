import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponsePageable } from "../models/responsePageable.model";
import { EmailModel } from "../models/email.model";
import { UserModel } from "../models/user.model";
import { LoginResponse } from "../interfaces/login.response"
import {PostModel} from "../models/post.model";
import {DictionaryModel} from "../models/dictionary.model";

@Injectable({
  providedIn: 'root'
})
export class BlogService {

 // apiUrl = 'http://localhost:8087/blog';
  apiUrl = 'https://metodologia-agil.com.br/blog';
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
  }public getByIdPosts(postId: string): Observable<PostModel> {
    return this.httpClient.get<PostModel>(`${ this.apiUrl }/public/posts/${postId}`);
  }
  public createPosts(postModel: PostModel): Observable<PostModel> {
    return this.httpClient.post<PostModel>(`${ this.apiUrl }/posts`, postModel, this.httpOptions);
  }
  public getDictionaryWord(word: string): Observable<ResponsePageable> {
    return this.httpClient.get<ResponsePageable>(`${this.apiUrl}/dictionaries?word=${word}`)
  }
  public createDictionary(dictionaryModel: DictionaryModel): Observable<DictionaryModel> {
    return this.httpClient.post<DictionaryModel>(`${ this.apiUrl }/dictionaries`, dictionaryModel, this.httpOptions);
  }
  public createdUser(userModel: UserModel): Observable<UserModel> {
    return this.httpClient.post<UserModel>(`${ this.apiUrl }/auth/signup`, userModel, this.httpOptions);
  }

  public postNewsletter(emailModel: EmailModel): Observable<EmailModel> {
    return this.httpClient.post<EmailModel>(`${ this.apiUrl }/newsletter`, emailModel, this.httpOptions);
  }

  public login(userModel: UserModel): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(`${this.apiUrl}/auth/login`, userModel, this.httpOptions);
  }
  public logout(): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}/auth/logout`);
  }
}

