import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostModel } from '../shared/models/post.model';
import { BlogService } from '../shared/services/blog.service';
import { Router } from '@angular/router';
import { DatePipe } from "@angular/common";
import { HttpEventType, HttpResponse } from '@angular/common/http';
import {Editor} from "tinymce";
@Component({
  selector: 'app-post-editor',
  templateUrl: './post-editor.component.html',
  providers: [DatePipe]
})
export class PostEditorComponent implements OnInit {
  selectedFile: File | null = null;
  editorConfig: any; // Configurações do TinyMCE
  editor: any;

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

    this.editorConfig = {
      width: 1000,
      height: 500,
      powerpaste_allow_local_images: true,
      placeholder: 'Digite o conteúdo da postagem',
      plugins: [
        'a11ychecker', 'advcode', 'advlist', 'anchor', 'autolink', 'codesample', 'fullscreen', 'help',
        'image', 'editimage', 'tinydrive', 'lists', 'link', 'media', 'powerpaste', 'preview',
        'searchreplace', 'table', 'template', 'tinymcespellchecker', 'visualblocks', 'wordcount'
      ],
      toolbar: ' bold italic underline | fontselect fontsizeselect | alignleft aligncenter alignright alignjustify | preview link image code fullscreen emoticons',
      file_picker_callback: (cb: any, value: any, meta: any) => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');

        input.onchange = () => {
          const file = input.files && input.files[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = () => {
              const base64 = reader.result?.toString();
              cb(base64, { title: file.name });
            };
            reader.readAsDataURL(file);
          }
        };
        input.click();
      },
      setup: (editor: Editor) => {
        this.editor = editor;
      }
    };
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

}
