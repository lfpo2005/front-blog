import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { DictionaryModel } from '../shared/models/dictionary.model';
import { BlogService } from '../shared/services/blog.service';
import {Meta, Title} from "@angular/platform-browser";

@Component({
  selector: 'app-dictionary',
  templateUrl: './dictionary.component.html',
})
export class DictionaryComponent implements OnInit {
  searchWord = '';
  listResult?: DictionaryModel[];
  public isSearched = false;


  ngOnInit(): void {
    // @ts-ignore
    this.getDictionaryWord(),
     this.titleService.setTitle('Dicionario de tecnologia e agilidade');

  }
  constructor(private service: BlogService,
              private cd: ChangeDetectorRef,
              private titleService: Title,
              private metaService: Meta,
  ) {this.metaService.addTag({
    name: 'description',
    content: 'O nosso dicionário de tecnologia e agilidade é uma fonte confiável de informações sobre os principais termos, conceitos e práticas utilizados no desenvolvimento de software ágil. Aprenda sobre Scrum, Kanban, DevOps, Continuous Integration, Continuous Delivery e muito mais. Encontre definições claras e exemplos práticos para ajudá-lo a entender melhor esses tópicos complexos e acelerar seu aprendizado.'
  });}

  getDictionaryWord(word: string): void {
    this.service.getDictionaryWord(word).subscribe({
      next: (data) => {
        this.listResult = data.content;
        this.cd.detectChanges()
        //console.log(data);
        this.isSearched = true;
      },
      error: (e) => alert('Atenção\n' + e.error),
    });
  }

}
