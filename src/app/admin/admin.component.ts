import {MediaMatcher} from '@angular/cdk/layout';

import {ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import { AppComponent } from '../app.component';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { frontendVersion } from '../model/Constants';

/** @title Responsive sidenav */
@Component({
  selector: 'app-admin',
  templateUrl: 'admin.component.html',
  styleUrls: ['admin.component.css'],
})
export class AdminComponent{
  footerText="";
  env:string="";
  username:any="";
  emplNbr:any="";
  backendVersion:any="";
  roleList:any;
  title ="personalization-admin"
  app: any;

  isExpanded = true;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;

  constructor(changeDetectorRef: ChangeDetectorRef ,app:AppComponent,private router:Router,private http:HttpClient) {
    this.app=app;
    this.getEnv();
    this.getBackendVersion();
    this.getUsername();
    this.getEmplNbr();
    this.getRoleList();
    this.footerText = "---------------------Environment:"+this.env+
                      "---------------------Backend Version:"+this.backendVersion+
                      "---------------------Frontend Version:"+frontendVersion+
                      "---------------------";
  }


  logout(){
    this.http.get<any>('/apis/sysinfo/logoutUrl').subscribe(data=>{
      window.location.href=data.logoutUrl;
    });
  }

  getEnv(){
    this.http.get<any>('/apis/sysinfo/env').subscribe(data=>{
      this.env=data.env.toUpperCase();
      this.setupFooterText();
    });
  }

  getBackendVersion(){
    this.http.get<any>('/apis/sysinfo/version').subscribe(data=>{
      this.backendVersion=data.version;
      this.setupFooterText();
    });
  }

  getUsername(){
    this.http.get<any>('/apis/userinfo/name').subscribe(data=>{
      this.username=data.username;
    });
  }

  getEmplNbr(){
    this.http.get<any>('/apis/userinfo/number').subscribe(data=>{
      this.emplNbr=data.number;
    });
  }

  getRoleList(){
    this.http.get<any>('/apis/userinfo/role').subscribe(data=>{
      this.roleList=data;
    });
  }

  setupFooterText(){
    this.footerText = "---------------------Environment:"+this.env+
                      "---------------------Backend Version:"+this.backendVersion+
                      "---------------------Frontend Version:"+frontendVersion+
                      "---------------------";
  }

  test(){
    console.log("1")
  }

  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }
}
