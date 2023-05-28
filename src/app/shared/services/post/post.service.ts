import {BaseService} from "../base.service";
import {Observable} from "rxjs";
import {HttpEvent, HttpHeaders} from "@angular/common/http";
import {ResponsePageable} from "../../models/responsePageable.model";
import {PostModel} from "../../models/post.model";

export class PostService extends BaseService {

  public createPosts(postData: FormData): Observable<HttpEvent<any>> {
    return this.httpClient.post<any>(`${this.apiUrl}/posts`, postData, {
      reportProgress: true,
      observe: 'events',
    });
  }
  public editPost(postId: string, postData: any): Observable<any> {
    return this.httpClient.put(`${this.apiUrl}/posts/${postId}`, postData, {
      reportProgress: true,
      observe: 'events',
    });
  }
  public deletePost(postId: string, token: string): Observable<any> {
    return this.httpClient.delete(`${this.apiUrl}/posts/${postId}`, this.getAuthenticatedHttpOptions(token));
  }
  public getAllPosts(): Observable<ResponsePageable> {
    const url = `${this.apiUrl}/public/posts/all`;
    return this.httpClient.get<ResponsePageable>(url);
  }
  public getByIdPosts(postId: string): Observable<PostModel> {
    return this.httpClient.get<PostModel>(`${ this.apiUrl }/public/posts/${postId}`);
  }

  public uploadPostImages(formData: FormData): Observable<HttpEvent<any>> {
    return this.httpClient.post<any>(`${ this.apiUrl }/upload-body-img`, formData, this.httpOptions);
  }
  public getPostsByTitle(title?: string): Observable<ResponsePageable> {
    let url = `${this.apiUrl}/public/posts`;
    if (title) {
      url += `?title=${title}`;
    }
    return this.httpClient.get<ResponsePageable>(url);
  }
  public searchPostsByTag(tag: string): Observable<PostModel[]> {
    return this.httpClient.get<PostModel[]>(`${this.apiUrl}/public/search?searchTerm=${tag}`)
  }
}
