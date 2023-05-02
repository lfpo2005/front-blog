import {Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {BlogService} from "../shared/services/blog.service";
import { DatePipe } from '@angular/common';
import { PostModel } from "../shared/models/post.model";


@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html'
})
export class PostDetailsComponent implements OnInit {
  post: any;
  @Input() listPosts?: PostModel[];


  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const postId = params.get('postId');
      if (postId !== null) {
        this.getPostDetails(postId);
      } else {
        console.error('postId is null');
      }
    });
  }
  formatData(data: string | null): string {
    const dataFormat = this.datePipe.transform(data, 'dd/MM/yyyy');
    return dataFormat ? dataFormat : '';
  }

  getPostDetails(postId: string) {
    this.blogService.getByIdPosts(postId).subscribe(
      (post) => {
        this.post = post;
      },
      (err) => {
        console.error('Erro ao buscar detalhes do post:', err);
      }
    );
  }

  onTagClick(tag: string) {
    this.blogService.searchPostsByTag(tag).subscribe({
      next: (data) => {
        this.listPosts = data;
      },
      error: (e) => console.error(e),
    });
  }
}
