import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostModel } from '../shared/models/post.model';
import { BlogService } from '../shared/services/blog.service';
import { Router } from '@angular/router';
import { DatePipe } from "@angular/common";
import 'summernote/dist/summernote-bs5.js';
import { HttpEventType, HttpResponse } from "@angular/common/http";

declare let $: any;
declare let document: any;

@Component({
  selector: 'app-post-editor',
  templateUrl: './post-editor.component.html',
  providers: [DatePipe]
})
export class PostEditorComponent implements OnInit {
  selectedFile: File | null = null;


  @Output() postCreated = new EventEmitter<PostModel>();
  postForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private blogService: BlogService,
    private router: Router,
  ) {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      post: ['', Validators.required],
      description: ['', Validators.required],
      imgUrl: [''],
      tags: [''],
    });
  }
  ngOnInit(): void {
    this.postForm.valueChanges.subscribe(value => {
    });
  }
  onSubmit() {
    if (this.postForm.valid) {
      const post: PostModel = this.postForm.value;
      const tagsInput = this.postForm.get('tags')?.value;
      if (typeof tagsInput === 'string') {
        post.tags = tagsInput.split(',').map((tag: string) => tag.trim());
      } else {
        post.tags = [];
      }
      const formData = new FormData();
      formData.append('title', post.title ?? '');
      formData.append('post', post.post ?? '');
      formData.append('description', post.description ?? '');
      formData.append('tags', post.tags.join(','));

      if (this.selectedFile) {
        formData.append('img', this.selectedFile, this.selectedFile.name);
      }
      this.blogService.createPosts(formData).subscribe(
        event => {
          if (event.type === HttpEventType.UploadProgress) {
          } else if (event instanceof HttpResponse) {
            alert("Post criado com sucesso!");
            const postId = event.body.postId;
            this.postForm.reset();
            this.router.navigate(['/postDetails', postId]);
          }
        },
        (err) => {
          alert("Erro ao criar post!");
        }
      );
    } else {
      alert("Erro ao criar post!");
    }
  }
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }
  ngAfterViewInit() {
    $(document).ready(function() {
      $('.summernote').summernote();
      const noteBar = $('.note-toolbar');
      noteBar.find('[data-toggle]').each(function(this: any) {
        $(this).attr('data-bs-toggle', $(this).attr('data-toggle')).removeAttr('data-toggle');
      });
    });

    setTimeout(() => {
      $('#summernote').summernote();
    }, 0);
  }
}
