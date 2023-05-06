import {Component, OnInit} from '@angular/core';
import { BlogService } from '../shared/services/blog.service';
import { FormControl, FormGroup } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { RoleType } from "../shared/enum/roleType.enum";
import jwt_decode from "jwt-decode"
import {Title} from "@angular/platform-browser";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  constructor(
    private service: BlogService,
    private route: ActivatedRoute,
    private router: Router,
    private titleService: Title,
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Blog Agil - Cadastro de usuário');
  }

  public loginForm: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  public postLogin() {
    this.service.login(this.loginForm?.value).subscribe(
      (res) => {
        console.log('Login realizado com sucesso!', res);

        // Armazenar o token no local storage
        localStorage.setItem('token', res.token);

        // Decodificar o token
        const decodedToken = jwt_decode(res.token);

        // Verificar se o token decodificado tem a propriedade 'roles'
        if (decodedToken && typeof decodedToken === 'object' && 'roles' in decodedToken) {
          const roles = (decodedToken as any).roles;

          this.loginForm.reset();

          // Verificar o tipo de usuário e redirecioná-lo
          if (roles.includes(RoleType.ROLE_ADMIN)) {
            this.router.navigate(['/admin']);
          }
        }
      },
      (err) => {
        console.error('Erro ao fazer o login', err);
        alert(
          'Não foi possível fazer o login. Por favor, tente novamente mais tarde.'
        );
      }
    );
  }
  login() {
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.router.navigate([returnUrl]);
  }
}
