import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { DictionaryModel } from '../shared/models/dictionary.model';
import { BlogService } from '../shared/services/blog.service';

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
    this.getDictionaryWord();

  }

  constructor(private service: BlogService, private cd: ChangeDetectorRef) {}

  getDictionaryWord(word: string): void {
    this.service.getDictionaryWord(word).subscribe({
      next: (data) => {
        this.listResult = data.content;
        this.cd.detectChanges()
        console.log(data);
        this.isSearched = true;
      },
      error: (e) => alert('Atenção\n' + e.error),
    });
  }

}
