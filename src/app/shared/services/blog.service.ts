import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponsePageable } from "../models/responsePageable.model";
import {EmailModel} from "../models/email.model";

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  apiUrl = 'http://localhost:8080/blog';
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
  public postNewsletter(emailModel: EmailModel): Observable<EmailModel> {
    return this.httpClient.post<EmailModel>(`${ this.apiUrl }/newsletter`, emailModel, this.httpOptions);
  }
}

