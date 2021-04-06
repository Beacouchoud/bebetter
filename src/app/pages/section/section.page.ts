import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-section',
  templateUrl: './section.page.html',
  styleUrls: ['./section.page.scss'],
})
export class SectionPage implements OnInit {
  public section: string;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.section = this.activatedRoute.snapshot.paramMap.get('id');
  }

}
