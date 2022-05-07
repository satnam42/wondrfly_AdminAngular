import { Component, OnInit, Input } from '@angular/core';
import { Userr } from 'app/shared/models/user.model';
import { HttpClient } from '@angular/common/http';
import { AuthsService } from 'app/shared/services/auth.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.template.html'
})
export class SidenavComponent {
  @Input('items') public menuItems: any[] = [];
  @Input('hasIconMenu') public hasIconTypeMenuItem: boolean;
  @Input('iconMenuTitle') public iconTypeMenuTitle: string;

  token: string = ''
  user = new Userr;
  state: any;
  constructor(private http: HttpClient,
    private auth: AuthsService) {

    this.token = auth.isAuthorized();
    this.user = auth.currentUser();
  }

  ngOnInit() {

  }

  // Only for demo purpose
  addMenuItem() {
    this.menuItems.push({
      name: 'ITEM',
      type: 'dropDown',
      tooltip: 'Item',
      icon: 'done',
      state: 'material',
      sub: [
        { name: 'SUBITEM', state: 'cards' },
        { name: 'SUBITEM', state: 'buttons' }
      ]
    });
  }
}