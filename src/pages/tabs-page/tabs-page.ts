import { TrackingPage } from '../tracking/tracking';
import { ARPage } from '../AR/ar';
import { Component } from '@angular/core';

import { NavParams } from 'ionic-angular';

import { MapPage } from '../map/map';
import {ApplyPage} from "../apply/apply";
import {OfferPage} from '../offer/offer';
import {HomePage} from '../home/home';

@Component({
  templateUrl: 'tabs-page.html'
})
export class TabsPage {
  // set the root pages for each tab
  tab1Root: any = OfferPage;
  tab2Root: any = HomePage;
  tab3Root: any = MapPage;
  tab4Root: any = ARPage;
  tab5Root: any = ApplyPage;
  tab6Root: any = TrackingPage;
  mySelectedIndex: number;

  constructor(navParams: NavParams) {
    this.mySelectedIndex = navParams.data.tabIndex || 0;
  }

}
