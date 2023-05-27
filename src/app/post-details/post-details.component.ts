import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseService } from '../shared/services/base.service';
import { DatePipe } from '@angular/common';
import { PostModel } from '../shared/models/post.model';
import { Meta, Title } from '@angular/platform-browser';
import { Location } from '@angular/common';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html'
})
export class PostDetailsComponent implements OnInit {
  @Input() listPosts?: PostModel[];
  @Output() tagClicked = new EventEmitter<string>();
  private _post: any;
  currentUrl!: string;

  constructor(
    private route: ActivatedRoute,
    private blogService: BaseService,
    private datePipe: DatePipe,
    private titleService: Title,
    private router: Router,
    private metaService: Meta,
    private location: Location
  ) {
    this.metaService.addTag({
      name: 'description',
      content:
        'Descubra as melhores práticas de integração contínua para melhorar a qualidade do seu software. A integração contínua é uma técnica de desenvolvimento ágil que permite integrar e testar automaticamente as alterações de código de várias equipes em um único repositório. Neste artigo, você aprenderá como implementar a integração contínua em seu projeto de software, os benefícios dessa abordagem e as ferramentas mais populares para ajudá-lo a automatizar o processo de integração e teste.'
    });
  }

  get post() {
    return this._post;
  }

  set post(value: any) {
    this._post = value;
    this.updateTitle();
  }

  updateTitle(): void {
    if (this.post && this.post.title) {
      this.titleService.setTitle(this.post.title);
    } else {
      this.titleService.setTitle('Título padrão');
    }
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const postId = params.get('postId');
      if (postId !== null) {
        this.getPostDetails(postId);
        this.currentUrl = `https://metodologia-agil.com.br/postDetails/${postId}`;
      } else {
        console.error('postId is null');
      }
    });
  }

  formatData(data: string | null): string {
    const dataFormat = this.datePipe.transform(data, 'dd/MM/yyyy');
    return dataFormat ? dataFormat : '';
  }

  // getPostDetails(postId: string) {
  //   this.blogService.getByIdPosts(postId).subscribe(
  //     post => {
  //       // // Substitui barras invertidas por barras
  //       // let imgPath = post.imgCover?.replace(/\\/g, '/');
  //       //
  //       // // Determina a URL base com base na localização da janela
  //       // let baseUrl = window.location.origin + '/blog';
  //       //
  //       // // Constrói a URL completa para a imagem
  //       // post.imgCover = `${baseUrl}/${imgPath}`;
  //
  //       this.post = post;
  //
  //     },
  //     err => {
  //       console.error('Erro ao buscar detalhes do post:', err);
  //     }
  //   );
  // }

  getPostDetails(postId: string) {
    this.blogService.getByIdPosts(postId).subscribe(
      post => {
        this.post = post;
      },
      err => {
        console.error('Erro ao buscar detalhes do post:', err);
      }
    );
  }
  onContentClick(event: MouseEvent) {
    const target = event.target as HTMLAnchorElement;
    if (target.tagName.toLowerCase() === 'a') {
      event.preventDefault();
      const url = target.getAttribute('href');
      if (url) {
        if (url.startsWith('/')) {
          this.router.navigateByUrl(url);
        } else if (url.startsWith(window.location.origin)) {
          const route = url.replace(window.location.origin, '');
          this.router.navigateByUrl(route);
        } else {
          window.open(url, '_blank');
        }
      } else {
      }
    }
  }

  onTagClick(tag: string) {
    this.router.navigate(['/'], { queryParams: { tag: tag } });
  }
}
