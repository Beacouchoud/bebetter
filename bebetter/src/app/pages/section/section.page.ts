import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivationEnd, ActivationStart, NavigationEnd, Router, RoutesRecognized, UrlSegment } from '@angular/router';
import { IUser } from 'src/app/models/user.model';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-section',
  templateUrl: './section.page.html',
  styleUrls: ['./section.page.scss'],
})
export class SectionPage implements OnInit {
  public title: String;
  public user: IUser;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private utils: UtilsService) {
    this.router.events.subscribe((data) => {
      if (data instanceof ActivationStart || data instanceof  ActivationEnd) {
        this.title = !!data.snapshot.data.title ? data.snapshot.data.title : this.title;
      }
    });
    utils.setEnableMenu(true);
    utils.setEnableTitle(true);
  }

  ngOnInit() {}

  public get showTitle () {
    return this.utils.getEnableTitle();
  }
}
