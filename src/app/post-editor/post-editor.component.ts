import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostModel } from '../shared/models/post.model';
import { BlogService } from '../shared/services/blog.service';

@Component({
  selector: 'app-post-editor',
  templateUrl: './post-editor.component.html'
})
export class PostEditorComponent implements OnInit {
  config = {
    placeholder: '',
    tabsize: 2,
    height: 200,
    uploadImagePath: '/api/upload',
    toolbar: [
      ['misc', ['codeview', 'undo', 'redo']],
      ['style', ['bold', 'italic', 'underline', 'clear']],
      ['font', ['bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript', 'clear']],
      ['fontsize', ['fontname', 'fontsize', 'color']],
      ['para', ['style', 'ul', 'ol', 'paragraph', 'height']],
      ['insert', ['table', 'picture', 'link', 'video', 'hr']]
    ],
    fontNames: ['Helvetica', 'Arial', 'Arial Black', 'Comic Sans MS', 'Courier New', 'Roboto', 'Times']
  }

  @Output() postCreated = new EventEmitter<PostModel>();
  postForm: FormGroup;

  constructor(private fb: FormBuilder, private blogService: BlogService) {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      post: ['', Validators.required],
      description: ['', Validators.required],
      imgUrl: ['', Validators.required],
      tags: [''],
    });
  }

  ngOnInit(): void {
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

      this.blogService.createPosts(post).subscribe(
        (createdPost: PostModel) => {
          console.log('Post criado com sucesso', createdPost);
          this.postCreated.emit(createdPost);
        },
        (error) => {
          console.error('Erro ao criar post', error);
        }
      );
    }
  }
}
