import {Component, EventEmitter, Output} from '@angular/core';
import {PostModel} from "../shared/models/post.model";
import {PostService} from "../shared/services/post/post.service";
import {Router} from "@angular/router";
import {AuthService} from "../shared/services/auth.service";
import {ResponsePageable} from "../shared/models/responsePageable.model";

@Component({
  selector: 'app-post-list-component',
  templateUrl: './post-list.component.html'
})
export class PostListComponent {
  @Output() postEditorCreated = new EventEmitter<PostModel>()
  posts: any[] = [];

  constructor(
    private postService: PostService,
    private router: Router,
    private authService: AuthService
  ) {
    this.getPosts();
  }

  getPosts() {
    this.postService.getAllPosts().subscribe(
      (data: ResponsePageable) => this.posts = data.content || [],
      (error) => console.error(error)
    );
  }

  editPost(postId: string) {
    this.router.navigate(['/post-editor', postId]);
  }

  deletePost(postId: string) {
    let token = this.authService.getToken();
    if (token === null) {
      console.error('Token is null');
      return;
    }

    this.postService.deletePost(postId, token).subscribe(
      () => this.getPosts(),
      (error) => console.error(error)
    );
  }
  createNewPost() {
    this.router.navigate(['/post-editor']);
  }
}
