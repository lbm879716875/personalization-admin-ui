import {MediaMatcher} from '@angular/cdk/layout';
import { newArray } from '@angular/compiler/src/util';
import {ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import { environment } from 'src/environments/environment';

/** @title Responsive sidenav */
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
})
export class AppComponent implements OnDestroy {
  mobileQuery: MediaQueryList;
  title ="personalization-admin"
  // fillerNav = Array.from({length: 50}, (_, i) => `Nav Item ${i + 1}`);



  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    console.log(environment.apiUrl)
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }


  
}


/**  Copyright 2021 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */