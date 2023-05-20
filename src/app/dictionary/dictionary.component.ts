import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { DictionaryModel } from '../shared/models/dictionary.model';
import { BlogService } from '../shared/services/blog.service';
import {Meta, Title} from "@angular/platform-browser";
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-dictionary',
  templateUrl: './dictionary.component.html',
})
export class DictionaryComponent implements OnInit {
  searchWord = '';
  listResult?: DictionaryModel[];
  public isSearched = false;

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchWord = params['pesquisa'] || '';
      if (this.searchWord) {
        this.getDictionaryWord(this.searchWord);
      }
    });
    this.titleService.setTitle('Dicionario de tecnologia e agilidade');
  }

  constructor(private service: BlogService,
              private cd: ChangeDetectorRef,
              private titleService: Title,
              private metaService: Meta,
              private router: Router,
              private route: ActivatedRoute
  ) {
    this.metaService.addTag({
      name: 'description',
      content: 'O nosso dicionário de tecnologia e agilidade é uma fonte confiável de informações sobre os principais termos, conceitos e práticas utilizados no desenvolvimento de software ágil. Aprenda sobre Scrum, Kanban, DevOps, Continuous Integration, Continuous Delivery e muito mais. Encontre definições claras e exemplos práticos para ajudá-lo a entender melhor esses tópicos complexos e acelerar seu aprendizado.'
    });
  }

  getDictionaryWord(word: string): void {
    this.service.getDictionaryWord(word).subscribe({
      next: (data) => {
        this.listResult = data.content;
        this.cd.detectChanges()
        console.log(data);
        this.isSearched = true;

        // Navega para a mesma rota com o termo de pesquisa como parâmetro de consulta
        this.router.navigate(['/dictionary'], {queryParams: {pesquisa: word}});
      },
      error: (e) => alert('Atenção\n' + e.error),
    });
  }
}
