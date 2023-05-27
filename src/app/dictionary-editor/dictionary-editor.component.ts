import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BaseService} from "../shared/services/base.service";
import { DictionaryModel } from "../shared/models/dictionary.model";

@Component({
  selector: 'app-dictionary-editor',
  templateUrl: './dictionary-editor.component.html'
})
export class DictionaryEditorComponent implements OnInit {

  @Output() dictionaryCreated = new EventEmitter<DictionaryModel>();
  dictionaryForm: FormGroup;

  ngOnInit(): void {
  }
  constructor(private fb: FormBuilder,
              private blogService: BaseService,
  ) {
    this.dictionaryForm = this.fb.group({
      word: ['', Validators.required],
      reference: ['', Validators.required],
      link: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.dictionaryForm.valid) {
      const dictionary: DictionaryModel = this.dictionaryForm.value;

      this.blogService.createDictionary(dictionary).subscribe(
        (dictionaryCreated) => {
          this.dictionaryCreated.emit(dictionaryCreated);
          this.dictionaryForm.reset();
          alert('Dictionary criado com sucesso!');
        },
        (err) => {
          alert('Erro ao criar dictionary!');
        }
      );
    } else {
      alert('Erro ao criar dictionary!');
    }
  }

}
