import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-section',
  templateUrl: './section.page.html',
  styleUrls: ['./section.page.scss'],
})
export class SectionPage implements OnInit {
  public section: string;
  title = "Home";

  constructor(private activatedRoute: ActivatedRoute) {
    console.log("loviuuuu");
  }

  ngOnInit() {
    this.section = this.activatedRoute.snapshot.paramMap.get('id');
  }

}
