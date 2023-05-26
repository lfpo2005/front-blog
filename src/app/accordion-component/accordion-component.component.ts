import {Component, OnInit} from '@angular/core';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-accordion-component',
  templateUrl: './accordion-component.component.html'
})
export class AccordionComponentComponent implements OnInit {
  constructor(private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Releases');

  }
}
