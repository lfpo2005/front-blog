import {Component, OnInit} from '@angular/core';
import { BaseService } from '../shared/services/base.service';
import { FormControl, FormGroup } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { RoleType } from "../shared/enum/roleType.enum";
import jwt_decode from "jwt-decode"
import {Title} from "@angular/platform-browser";
import {AuthService} from "../shared/services/auth.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  constructor(
    private service: BaseService,
    private route: ActivatedRoute,
    private router: Router,
    private titleService: Title,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Metodologia-Agil - Cadastro de usuário');
  }

  public loginForm: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  public postLogin() {
    this.service.login(this.loginForm?.value).subscribe(
      (res) => {
        localStorage.setItem('token', res.token);

        const decodedToken = jwt_decode(res.token);

        if (decodedToken && typeof decodedToken === 'object' && 'roles' in decodedToken) {
          const roles = (decodedToken as any).roles;

          this.loginForm.reset();

          this.authService.setReturnUrl(this.route.snapshot.queryParams['returnUrl']);

          if (roles.includes(RoleType.ROLE_ADMIN)) {
            this.router.navigate(['/admin']);
          } else if (roles.includes(RoleType.ROLE_USER)) {
            const returnUrl = this.authService.getReturnUrl() || '/simulado';
            this.router.navigate([returnUrl]);
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
    const returnUrl = this.authService.getReturnUrl() || '/';
    this.router.navigate([returnUrl]);
  }
}
