import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostModel } from '../shared/models/post.model';
import {ActivatedRoute, Router} from '@angular/router';
import { DatePipe } from "@angular/common";
import { HttpEventType, HttpResponse } from "@angular/common/http";
import { SummernoteOptions } from "ngx-summernote/lib/summernote-options";
import {PostService} from "../shared/services/post/post.service";
import { AuthService } from "../shared/services/auth.service";

import {Observable} from "rxjs";


declare let $: any;
declare let document: any;

@Component({
  selector: 'app-post-editor',
  templateUrl: './post-editor.component.html',
  providers: [DatePipe]
})
export class PostEditorComponent implements OnInit {
  selectedFile: File | null = null;
  content: string = '';
  post: PostModel | null = null;

  config = {
    placeholder: 'Conteúdo do post',
    tabsize: 2,
    height: 200,
    popover: {
      toolbar: [
        ['misc', ['codeview', 'undo', 'redo']],
        ['style', ['bold', 'italic', 'underline', 'clear']],
        ['font', ['bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript', 'clear']],
        ['fontsize', ['fontname', 'fontsize', 'color']],
        ['para', ['style', 'ul', 'ol', 'paragraph', 'height']],
        ['insert', ['table', 'picture', 'link', 'video', 'hr']]
      ],
      image: [
        ['custom', ['examplePlugin']],
        ['imagesize', ['imageSize100', 'imageSize50', 'imageSize25']],
        ['float', ['floatLeft', 'floatRight', 'floatNone']],
        ['remove', ['removeMedia']]
      ]
    }
  }

  @Output() postCreated = new EventEmitter<PostModel>();
  postForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
  ) {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      post: ['', Validators.required],
      description: ['', Validators.required],
      imgCover: [null],
      alt: [''],
      tags: [''],
    });
  }

  ngOnInit(): void {
    this.postForm.valueChanges.subscribe(value => {
    });
    const postId = this.route.snapshot.paramMap.get('postId');
    if (postId) {
      this.postService.getByIdPosts(postId).subscribe(
        (data) => {
          this.post = data;
          this.postForm.patchValue({
            title: data.title,
            post: data.post,
            description: data.description,
            alt: data.alt,
            tags: data.tags?.join(','),
          });
        },
        (error) => console.error(error)
      );
    }
  }
  // onEdit() {
  //   if (this.postForm.valid) {
  //     const postId = this.route.snapshot.paramMap.get('postId');
  //     const postData = this.postForm.value;
  //     const token = this.authService.getToken();
  //
  //     this.postService.editPost(postId, postData, token).subscribe(
  //       () => {
  //         alert('Post editado com sucesso!');
  //         this.router.navigate(['/postDetails', postId]);
  //       },
  //       (error) => {
  //         alert('Erro ao editar o post.');
  //         console.error(error);
  //       }
  //     );
  //   } else {
  //     alert('Verifique os campos do formulário antes de enviar a edição do post.');
  //   }
  // }

  onSubmit() {
    if (this.postForm.valid) {
      const content = this.postForm.get('post')?.value;
      const parser = new DOMParser();
      const doc = parser.parseFromString(content, 'text/html');
      const images = doc.querySelectorAll('img');
      for (let i = 0; i < images.length; i++) {
        const image = images[i];
        if (image.src.startsWith('data:image/')) {
          const base64Data = image.src.split(',')[1];
          const size = base64Data.length * 0.75;
          if (size > 307200) {
            alert('Uma das imagens é muito grande. Por favor, remova ou reduza o tamanho da imagem.');
            return;
          }
        }
      }

      const postId = this.route.snapshot.paramMap.get('postId');
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
      formData.append('alt', post.alt ?? '');
      formData.append('tags', post.tags.join(','));

      if (this.selectedFile) {
        formData.append('imgCover', this.selectedFile, this.selectedFile.name);
      }

      const postImages = $(document).find('#summernote').summernote('core.getImages');
      if (postImages && postImages.length > 0) {
        const postImagesFormData = new FormData();
        for (let i = 0; i < postImages.length; i++) {
          postImagesFormData.append('postImages', postImages[i].file);
        }
        console.log('JSON:', formData);

        this.postService.uploadPostImages(postImagesFormData).subscribe(
          (event: any) => {
          },
          (err: any) => {
            alert("Erro ao enviar as imagens do corpo do post!");
            console.error(err);
            return;
          }
        );
      }
      if (postId) {
            this.postService.editPost(postId, formData).subscribe(
          () => {
            console.log('Success on editing post');
            alert('Post editado com sucesso!');
            this.router.navigate(['/postDetails', postId]);
          },
          (err: any) => {
            console.error('Error on editing post:', err);
            alert('Erro ao editar o post!');
          }
        );
      } else {
        this.postService.createPosts(formData).subscribe(
          (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              console.log('Upload progress:', event);
            } else if (event instanceof HttpResponse) {
              console.log('Success on creating post');
              alert("Post criado com sucesso!");
              const newPostId = event.body.postId;
              this.postForm.reset();
              this.router.navigate(['/postDetails', newPostId]);
            }
          },
          (err: any) => {
            console.error('Error on creating post:', err);
            alert("Erro ao criar post!");
          }
        );

      }
    } else {
      alert("Erro ao criar post!");
    }
  }


  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  ngAfterViewInit() {
    $(document).ready(() => {
      $('#summernote').summernote({
        callbacks: {
          onChange: (contents: string, $editable: any) => {
            this.postForm.controls['post'].setValue(contents);
          }
        }
      });
    });
  }

  summernoteOptions: SummernoteOptions = {
    callbacks: {
      onChange: (contents: string) => {
        this.content = contents;
      }
    }
  };
}
