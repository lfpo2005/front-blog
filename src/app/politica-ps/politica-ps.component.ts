import {Component, OnInit} from '@angular/core';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-politica-ps',
  templateUrl: './politica-ps.component.html'
})
export class PoliticaPSComponent implements OnInit {
  constructor(private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Política de privacidade e segurança');

  }

}
