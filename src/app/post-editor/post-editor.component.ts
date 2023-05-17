import {Component, OnInit, Output, EventEmitter, OnDestroy} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostModel } from '../shared/models/post.model';
import { BlogService } from '../shared/services/blog.service';
import { Router } from '@angular/router';
import { DatePipe } from "@angular/common";
import { HttpEventType, HttpResponse } from '@angular/common/http';
import {Editor, schema, Toolbar} from 'ngx-editor';

@Component({
  selector: 'app-post-editor',
  templateUrl: './post-editor.component.html',
  providers: [DatePipe]
})
export class PostEditorComponent implements OnInit, OnDestroy {
  selectedFile: File | null = null;
  // editor!: Editor;

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
      imgUrl: ['', Validators.required],
      tags: ['', Validators.required],
      editor: ['', Validators.required]
    });
  }
  editor!: Editor;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
    ['horizontal_rule', 'format_clear'],
  ];
  onEditorChange(content: any) {
    this.postForm.get('editor')?.setValue(content, { emitEvent: false });
  }

  ngOnInit(): void {
    this.postForm.valueChanges.subscribe(value => {
    });
    this.editor = new Editor();
  }
  onSubmit() {
    console.log('title:', this.postForm.get('title')?.value, this.postForm.get('title')?.valid);
    console.log('post:', this.postForm.get('post')?.value, this.postForm.get('post')?.valid);
    console.log('editor:', this.postForm.get('editor')?.value, this.postForm.get('editor')?.valid);
    console.log('description:', this.postForm.get('description')?.value, this.postForm.get('description')?.valid);
    console.log('imgUrl:', this.postForm.get('imgUrl')?.value, this.postForm.get('imgUrl')?.valid);
    console.log('tags:', this.postForm.get('tags')?.value, this.postForm.get('tags')?.valid);
    const editorContent = this.postForm.get('editor')?.value;
    if (this.postForm.valid) {
      const post: PostModel = this.postForm.value;
      post.post = editorContent;
      const tagsInput = this.postForm.get('tags')?.value;
      if (typeof tagsInput === 'string') {
        post.tags = tagsInput.split(',').map((tag: string) => tag.trim());
      } else {
        post.tags = [];
      }

      // Create a FormData object
      const formData = new FormData();
      // Append the form fields
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
    //console.log('Arquivo selecionado:', this.selectedFile);
  }
  ngOnDestroy(): void {
    this.editor.destroy();
  }

}
