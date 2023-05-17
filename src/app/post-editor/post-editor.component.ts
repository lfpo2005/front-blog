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
      tinydrive_token_provider: ({success}: { success: any }) => {
        success({ token: '{\n' +
            '  "kty": "RSA",\n' +
            '  "n": "vH2k3N8xdZlGFQO5U0X94CpW_AP3boSA3ZbeWZy_ZcxzaA9nguHnNuPaqHxYMFAiYaV2dgKImGizMwKzJ8Mdfb6_pNdRDB6Eq1Ek7Qg8uXLh6iA514NFMFCdJuQkpXvJAIQKvnlHgjQx21eWM0O1I5FaaFuu_lGB5acD0C0w6cgLZBAaTg5AtalLw-f8hpzdTgTtXM8AFrvaUmbFEY-OfMRBF5qd0WVMhwMhnUn8-47jq1wQAlQJNSaUd9cjlgpy1PyPIL8oY_BuqMXKmo15Duj3I-szfrayChTvY510GeCPacjdpSZQ0igYTVz04bAP6lRyHuJG28i_-vevhK-J8w",\n' +
            '  "e": "AQAB",\n' +
            '  "d": "CDFL15_J1gst7R7m0LRDlxkwA68mc4LF2RvEGVADT6jlwTmeLaWk95FKwTT6Xks1W1omPnXYuwsd8tMkt083Om5uhPso1iaDbLDPso-_l-3i3Nq-uNvHR5TRZ83Vu-2X7HJQxzudPI8JNbfmWt8QAfZA4DVP81TWmQU72LIGJLsOgQmKtMG9VvsjyQkdsTxe-0aGG2_eFqUzhK8-RnN0yvLYf0g7lCer6Z2iYtPigLLqgs7C2j4FrOwZj7MakuvEC0u9Qb2X_HVIPo6sbp4NRGmC5d8SS5BR-JFuWCbafJ_uM9SWUYfHNBpecFxDCPs8QVZJRGppV8TYauEmsRNLdQ",\n' +
            '  "p": "7Q-LikIIe354WjkKp4WJzbGi38imZUerNRQ_nEromtVRhDwC2FkcPP5AdNlcnbJq_EsBeYizkePbD69HKhLh10RvAVwCl_7bxZOHFgQSkK0yJ_9gh1Jp1G4L4k4MlOCrSDKVVi-1XaXsEzjNIRJ5qU2nnsaA-f4sEFXL-hobTI0",\n' +
            '  "q": "y4y6gkUNFhSXpKQsIRJS_Dr2IKKV13igj4EJ_93ofcuy9L8gtCJ67vmLoNDYLX06cVrB4ZAPpRy9eklVfQmfD9pyc-Mgb61ExMcnVvXKaObVj_kuZ3Qv9_83v1ZvhF1vFNGqPIo85J_Nm8Za8nqS5xPL6W-BioBl5Hg6h_c60H8",\n' +
            '  "dp": "QdKAJ0qAenG6Tyrpd2xPwApjtAlNkm-c7ScLJoVyIpO6h6H2FEZh3dmm4gr8eVjx9c2JwkofuhFvYOKFOvx1MsVwoQsAOV3tfeWhq45D7WH5vDtffRN4CSDpMdQEEE51oJ1S89RZYoBQlWG_K0CrAURrl118sG1PpNV9xpr7G30",\n' +
            '  "dq": "ux9sdkW0ehAEOD8UsnJ-B5LMocPVrHggYsxlvOrryHly0rzB-9eW3Apc6kIT-f2dtIeSpSIiv89kAP9Zr9EggRp5DUBHmWLYTW4oJDFhGn7a5bhViJWvY3UkcqmrayvZ6nG05mLPB_5ArmvzP-afFf-E_dycYg8XnKlKZaRKVVE",\n' +
            '  "qi": "XZqiyNaCcxbO0ml2BLLcqakR4tKWjk2yfb_4WZtpWJpJw8d-FDdbJFQoJ1siYLSJAlqrccQh7oi2hWfG46y_KxoIrOH4Ic5akei2GnDrzLLiK7bcQrgAJQyU3D1InV2eDDU7vRQx3fQGPT2R97lpKhILaDTfUdehdXS0yLpXeGM"\n' +
            '}' });
      },
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
