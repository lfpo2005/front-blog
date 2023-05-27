import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { DictionaryModel } from '../shared/models/dictionary.model';
import { BaseService } from '../shared/services/base.service';
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

  constructor(private service: BaseService,
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
  ngOnInit(): void {
    let initialSearchWord = 'a';

    this.route.queryParams.subscribe(params => {
      this.searchWord = params['pesquisa'] || '';
      if (!this.searchWord) {
        this.getDictionaryWord(initialSearchWord, false);
      }
    });

    this.titleService.setTitle('Dicionario de tecnologia e agilidade');
  }

  getDictionaryWord(word: string, updateUrl: boolean = true): void {
    this.service.getDictionaryWord(word).subscribe({
      next: (data) => {
        this.listResult = data.content;
        this.cd.detectChanges()
        this.isSearched = true;

        if (updateUrl) {
          this.router.navigate(['/dictionary'], {queryParams: {pesquisa: word}});
        }
      },
      error: (e) => alert('Atenção\n' + e.error),
    });
  }

}
