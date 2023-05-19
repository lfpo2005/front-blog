import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostModel } from '../shared/models/post.model';
import { BlogService } from '../shared/services/blog.service';
import { Router } from '@angular/router';
import { DatePipe } from "@angular/common";
import { HttpEventType, HttpResponse } from "@angular/common/http";
import { SummernoteOptions } from "ngx-summernote/lib/summernote-options";


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
    private blogService: BlogService,
    private router: Router,
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

        this.blogService.uploadPostImages(postImagesFormData).subscribe(
          (event: any) => {
          },
          (err: any) => {
            alert("Erro ao enviar as imagens do corpo do post!");
          }
        );
      }

      this.blogService.createPosts(formData).subscribe(
        (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
          } else if (event instanceof HttpResponse) {
            alert("Post criado com sucesso!");
            const postId = event.body.postId;
            this.postForm.reset();
            this.router.navigate(['/postDetails', postId]);
          }
        },
        (err: any) => {
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
