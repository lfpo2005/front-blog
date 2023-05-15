import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostModel } from '../shared/models/post.model';
import { BlogService } from '../shared/services/blog.service';
import { Router } from '@angular/router';
import { DatePipe } from "@angular/common";
import { HttpEventType, HttpResponse } from '@angular/common/http';

declare var tinymce: any;

@Component({
  selector: 'app-post-editor',
  templateUrl: './post-editor.component.html',
  providers: [DatePipe]
})
export class PostEditorComponent implements OnInit {
  selectedFile: File | null = null;
  editorConfig: any; // Configurações do TinyMCE

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
      height: 200,
      placeholder: 'Digite o conteúdo da postagem',
      plugins: 'lists link code fullscreen preview autosave image imagetools emoticons autoresize',
      toolbar: 'undo redo | bold italic underline | fontselect fontsizeselect | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | code | fullscreen | preview | autosave | emoticons | table',
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
      }
    };

  }
  ngOnInit(): void {
    this.postForm.valueChanges.subscribe(value => {
      //console.log('Mudança no valor do formulário:', value, 'Validade:', this.postForm.valid);
    });
  }

  onSubmit() {
    if (this.postForm.valid) {
      const post: PostModel = this.postForm.value;
      const tagsInput = this.postForm.get('tags')?.value;
      //console.log('Estado do formulário:', this.postForm, 'Validade:', this.postForm.valid);


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
      //console.log(formData);
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
  ngAfterViewInit(): void {
    tinymce.init(this.editorConfig);
  }

  ngOnDestroy(): void {
    tinymce.remove();
  }

}
