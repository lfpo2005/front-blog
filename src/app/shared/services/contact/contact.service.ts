import { BaseService } from "../base.service";
import { DictionaryModel } from "../../models/dictionary.model";
import { Observable } from "rxjs";
import { ContactModel } from "../../models/contact.model";
import { HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {AnsweredType} from "../../enum/answeredType";

@Injectable({
  providedIn: 'root'
})
export class ContactService extends BaseService {


  public createContact(contactModel: ContactModel): Observable<DictionaryModel> {
    return this.httpClient.post<DictionaryModel>(`${this.apiUrl}/contact`, contactModel, this.getHttpOptions());
  }

  public getAllMsgContacts(token: string | null): Observable<any[]> {
    const finalToken = token || '';
    return this.httpClient.get<any[]>(`${this.apiUrl}/contact`, this.getAuthenticatedHttpOptions(finalToken));
  }

  public getMsgContactById(id: string, token: string | null): Observable<any> {
    const finalToken = token || '';
    const url = `${this.apiUrl}/contact/${id}`;
    return this.httpClient.get<any>(url, this.getAuthenticatedHttpOptions(finalToken));
  }

  public deleteMsgContact(id: string, token: string | null): Observable<void> {
    const finalToken = token || '';
    const url = `${this.apiUrl}/contact/${id}`;
    return this.httpClient.delete<void>(url, this.getAuthenticatedHttpOptions(finalToken));
  }
  public updateAnsweredStatus(id: string, answeredTypeWrapper: { newAnsweredType: AnsweredType }, token: string) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    });

    return this.httpClient.patch(`${this.apiUrl}/contact/` + id, JSON.stringify(answeredTypeWrapper), {headers: headers});
  }

}
