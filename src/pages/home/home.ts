import { Component } from '@angular/core';

import {
  ActionSheet,
  ActionSheetController,
  Config,
  NavController, ModalController
} from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { ConferenceData } from '../../providers/conference-data';

import { SessionDetailPage } from '../session-detail/session-detail';
import { OfferDetailPage } from '../offer-detail/offer-detail';
import {AppFilterPage} from "../app-filter/app-filter";

// TODO remove
export interface ActionSheetButton {
  text?: string;
  role?: string;
  icon?: string;
  cssClass?: string;
  handler?: () => boolean|void;
};

@Component({
  selector: 'page-offer-list',
  templateUrl: 'home.html'
})
export class HomePage {
  actionSheet: ActionSheet;
  offers: any[] = [];
  excludeTracks: any = [];

  constructor(
    public actionSheetCtrl: ActionSheetController,
    public navCtrl: NavController,
    public confData: ConferenceData,
    public config: Config,
    public modalCtrl: ModalController,
    public inAppBrowser: InAppBrowser
  ) {}

  ionViewDidLoad() {
    //integrate with service
    this.confData.getOffers().subscribe((offers: any[]) => {
      this.offers = offers;
    });
  }
  update() {
    // Close any open sliding items when the schedule updates
/*    this.scheduleList && this.scheduleList.closeSlidingItems();

    this.confData.getTimeline(this.dayIndex, this.queryText, this.excludeTracks, this.segment).subscribe((data: any) => {
      this.shownSessions = data.shownSessions;
      this.groups = data.groups;
    });*/
  }
  presentToggles() {
    let modal = this.modalCtrl.create(AppFilterPage, this.excludeTracks);
    modal.present();

    modal.onWillDismiss((data: any[]) => {
      if (data) {
        this.excludeTracks = data;
        this.update();
      }
    });
  }

  goToSessionDetail(session: any) {
    this.navCtrl.push(SessionDetailPage, { sessionId: session.id });
  }

  goToSpeakerDetail(offer: any) {
    this.navCtrl.push(OfferDetailPage, { offerId: offer.id });
  }
}
