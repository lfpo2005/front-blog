import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from "@angular/forms";
import { BlogService } from "../shared/services/blog.service";
import { UserModel } from "../shared/models/user.model";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-created-user',
  templateUrl: './created-user.component.html'
})
export class CreatedUserComponent implements OnInit {
  userForm: FormGroup;
  formSubmitted: boolean = false;
  error: string = '';
  alertMessage: string | null = null;

  ngOnInit(): void {
    this.titleService.setTitle('Blog Agil - Cadastro de usuário');
  }

  showAlert(message: string) {
    this.alertMessage = message;
    setTimeout(() => {
      this.alertMessage = null;
    }, 5000);
  }

  constructor(
    private fb: FormBuilder,
    private titleService: Title,
    private blogService: BlogService,
  ) {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      fullName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
    }, {validator: this.checkPasswords});

    //console.log(this.userForm.controls);
  }

  validationMessages = {
    'username': {
      'required': 'O campo username é obrigatório.'
    },
    'email': {
      'required': 'O campo email é obrigatório.'
    },
    'password': {
      'required': 'O campo password é obrigatório.',
      'minlength': 'A senha deve ter pelo menos 6 caracteres.'
    },

    'confirmPassword': {
      'required': 'O campo confirmar senha é obrigatório.',
      'notSame': 'As senhas não são iguais'
    },
    'fullName': {
      'required': 'O campo nome completo é obrigatório.'
    },
    'phoneNumber': {
      'required': 'O campo telefone é obrigatório.'
    }
  };

  checkPasswords(group: FormGroup) {
    let pass = group.get('password')?.value;
    let confirmPass = group.get('confirmPassword')?.value;

    return confirmPass && pass === confirmPass ? null : {notSame: true};
  }
  onSubmit() {
    if (this.userForm.valid) {
      const user: UserModel = this.userForm.value;

      this.blogService.createdUser(user).subscribe(
        (userCreated) => {
          this.userForm.reset();
          alert('User criado com sucesso!');
        },
        (err) => {
          alert('Erro ao criar user!');
        }
      );
    } else {
      alert('Erro ao criar user!');
    }
  }
  passwordVisible = false;

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

}
