import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

import { RoutePartsService } from './shared/services/route-parts.service';
// import { ThemeService } from './shared/services/theme.service';

import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  // appTitle = 'WONDRFLY';
  pageTitle = '';

  constructor(
    public title: Title,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private routePartsService: RoutePartsService,
    // private themeService: ThemeService,
    // private layout: LayoutService,
    // private renderer: Renderer2
  ) { }

  ngOnInit() {
    // this.changePageTitle();
  }
  ngAfterViewInit() {
  }
  // changePageTitle() {
  //   this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((routeChange) => {
  //     // tslint:disable-next-line:no-var-keyword
  //     var routeParts = this.routePartsService.generateRouteParts(this.activeRoute.snapshot);
  //     // tslint:disable-next-line:curly
  //     if (!routeParts.length)
  //       return this.title.setTitle(this.appTitle);
  //     // Extract title from parts;
  //     this.pageTitle = routeParts
  //       .reverse()
  //       .map((part) => part.title)
  //       .reduce((partA, partI) => { return `${partA} > ${partI}`; });
  //     this.pageTitle += ` | ${this.appTitle}`;
  //     this.title.setTitle(this.pageTitle);
  //   });
  // }

}
