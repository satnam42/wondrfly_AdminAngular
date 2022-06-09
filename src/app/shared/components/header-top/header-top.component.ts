import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NavigationService } from "../../../shared/services/navigation.service";
import { Subscription } from 'rxjs';
import { ThemeService } from '../../../shared/services/theme.service';
import { TranslateService } from '@ngx-translate/core';
import { LayoutService } from '../../services/layout.service';
import { LocalStorageService } from 'app/shared/services/local-storage.service';
import { AuthsService } from 'app/shared/services/auth.service';
import { Userr } from 'app/shared/models/user.model';
import { NavigationEnd, Router } from '@angular/router';
@Component({
  selector: 'app-header-top',
  templateUrl: './header-top.component.html'
})
export class HeaderTopComponent implements OnInit, OnDestroy {
  layoutConf: any;
  menuItems: any=[];
  menuItemSub: Subscription;
  egretThemes: any[] = [];
  currentLang = 'en';
  availableLangs = [{
    name: 'English',
    code: 'en',
  }, {
    name: 'Spanish',
    code: 'es',
  }]
  isUserLoggedIn:boolean;
  @Input() notificPanel;
  user: Userr;
  routeName: string;
  constructor(
    private layout: LayoutService,
    private navService: NavigationService,
    public themeService: ThemeService,
    public translate: TranslateService,
    private store: LocalStorageService,
    private auth: AuthsService,
    private router: Router
  ) {
    this.user= auth.currentUser()
    this.auth.userChanges.subscribe( data => {
      this.user = data;
    });
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
          this.routeName = event.url;          
      }
    }
    )}
  


  ngOnInit() {
    this.layoutConf = this.layout.layoutConf;
    this.egretThemes = this.themeService.egretThemes;
    this.menuItemSub = this.navService.menuItems$.subscribe(res => {res = res.filter(item => item.type !== 'icon' && item.type !== 'separator');
        let limit = 4
        let mainItems: any[] = res.slice(0, limit)
        let subItems: any[] = res.slice(limit, res.length - 1)
        mainItems.push({
          name: 'More',
          type: 'dropDown',
          tooltip: 'More',
          icon: 'more_horiz',
          sub: subItems
        })
        switch (this.user.role) { 
          case "superAdmin": case "proofreader":{ 
            this.menuItems = mainItems
             break; 
          } 
          case "operationadmin": { 
            mainItems = mainItems.filter(item=> item.name=="Beta Program")
            this.menuItems = mainItems
             break; 
          } 
          case "extractor": { 
              let program:any =[];
              this.menuItems = mainItems.filter(item=> item.name=="Dashboard")
              for (let item of mainItems) {
                if (item.name=="Programs"){
                   let programList = item.sub.filter(e=> e.name=="Programs List")
                   item.sub = programList; 
                   program = item;
                }if(item.name=="Users"){
                  let providers = item.sub.filter(e=> e.name=="Providers")
                  program.sub.push(providers[0]);
                  this.menuItems.push(program);
                }
              }
             break; 
          } 
          default: { 
            this.menuItems = []
             break; 
          } 
       } 


        // if (this.user.role=="operationadmin") {
        //   mainItems = mainItems.filter(item=> item.name=="Beta Program")
        //    this.menuItems = mainItems
        // }
        // else if ( this.user.role!="operationadmin") {
        //  this.menuItems = mainItems
        // }
      })
  }
  ngOnDestroy() {
    this.menuItemSub.unsubscribe()
  }
  setLang() {
    this.translate.use(this.currentLang)
  }
  changeTheme(theme) {
    this.layout.publishLayoutChange({ matTheme: theme.name })
  }
  toggleNotific() {
    this.notificPanel.toggle();
  }
  logOut(){
   this.auth.logout();
  }
  toggleSidenav() {
    if (this.layoutConf.sidebarStyle === 'closed') {
      return this.layout.publishLayoutChange({
        sidebarStyle: 'full'
      })
    }
    this.layout.publishLayoutChange({
      sidebarStyle: 'closed'
    })
  }
}
