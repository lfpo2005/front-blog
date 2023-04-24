import {ChangeDetectorRef, Component} from '@angular/core';
import { DictionaryModel } from '../shared/models/dictionary.model';
import { BlogService } from '../shared/services/blog.service';

@Component({
  selector: 'app-dictionary',
  templateUrl: './dictionary.component.html',
})
export class DictionaryComponent {
  searchWord = '';
  listResult: DictionaryModel[] | null = null;

  constructor(private service: BlogService, private cd: ChangeDetectorRef) {}

  getDictionaryWord(word: string): void {
    this.service.getDictionaryWord(word).subscribe({
      next: (data) => {
        this.listResult = data;
        this.cd.detectChanges()
        console.log(data);
      },
      error: (e) => alert('Atenção\n' + e.error),
    });
  }
}
