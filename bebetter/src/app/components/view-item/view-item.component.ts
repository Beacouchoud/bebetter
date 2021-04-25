import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';

@Component({
  selector: 'app-view-item',
  templateUrl: './view-item.component.html',
  styleUrls: ['./view-item.component.scss'],
})
export class ViewItemComponent implements OnInit {

  constructor(private router: Router, private activateRouter: ActivatedRoute) { }

  ngOnInit() {}

  public goToEdit(): void {
    this.router.navigate(['../../EditItem/7'], {relativeTo: this.activateRouter});
  }
}
