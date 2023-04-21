import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-modalpost',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">{{ post.title }}</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p>{{ post.description }}</p>
      <p><small>{{ post.creationDate }}</small></p>
      <p>{{ post.post }}</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" (click)="activeModal.dismiss()">Fechar</button>
    </div>
  `
})
export class PostModalComponent {
  @Input() post: any;

  constructor(public activeModal: NgbActiveModal) { }
}

export class ModalpostComponent {
}
