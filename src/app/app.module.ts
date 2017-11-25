import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule, ErrorHandler } from '@angular/core';

import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SplashScreen } from '@ionic-native/splash-screen';

import { IonicStorageModule } from '@ionic/storage';

import { ConferenceApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { PopoverPage } from '../pages/about-popover/about-popover';
import { AccountPage } from '../pages/account/account';
import { LoginPage } from '../pages/login/login';
import { MapPage } from '../pages/map/map';
import { AppFilterPage } from '../pages/app-filter/app-filter';
import { SessionDetailPage } from '../pages/session-detail/session-detail';
import { SignupPage } from '../pages/signup/signup';
import { OfferDetailPage } from '../pages/offer-detail/offer-detail';
import { TabsPage } from '../pages/tabs-page/tabs-page';
import { PushNotificationPage } from '../pages/push-notification/push-notification';
import { ApplyPage } from '../pages/apply/apply';
import {ARPage} from "../pages/AR/ar";
import {OfferPage} from "../pages/offer/offer"
import {HomePage} from '../pages/home/home';
import {TrackingPage} from '../pages/tracking/tracking';
import { ConferenceData } from '../providers/conference-data';
import { UserData } from '../providers/user-data';
import { LocationTracker } from '../providers/location-tracker';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation';
import { Geolocation } from '@ionic-native/geolocation';
import { Push } from '@ionic-native/push';
import { RestapiServiceProvider } from '../providers/restapi-service';
import { BackgroundMode } from '@ionic-native/background-mode';
import { PushNotificationProvider } from '../providers/push-notification/push-notification';



@NgModule({
  declarations: [
    ConferenceApp,
    AboutPage,
    AccountPage,
    LoginPage,
    MapPage,
    PopoverPage,
    AppFilterPage,
    SessionDetailPage,
    SignupPage,
    OfferDetailPage,
    TabsPage,
    PushNotificationPage,
    ApplyPage,
    ARPage,
    OfferPage,
    HomePage,
    TrackingPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(ConferenceApp, {}, {
      links: [
        { component: TabsPage, name: 'TabsPage', segment: 'tabs-page' },
        { component: SessionDetailPage, name: 'SessionDetail', segment: 'sessionDetail/:sessionId' },
        { component: AppFilterPage, name: 'ScheduleFilter', segment: 'scheduleFilter' },
        { component: HomePage, name: 'OfferList', segment: 'offerList' },
        { component: OfferDetailPage, name: 'OfferDetail', segment: 'offerDetail/:offerId' },
        { component: MapPage, name: 'Map', segment: 'map' },
        { component: AboutPage, name: 'About', segment: 'about' },
        { component: ApplyPage, name: 'ApplyPage', segment: 'apply' },
        { component: ARPage, name: 'ARPage', segment: 'ar' },
        { component: LoginPage, name: 'LoginPage', segment: 'login' },
        { component: AccountPage, name: 'AccountPage', segment: 'account' },
        { component: SignupPage, name: 'SignupPage', segment: 'signup' },
        { component: PushNotificationPage, name: 'PushNotificationPage', segment: 'pushNotification' },
        {component:OfferPage, name:'Offer',segment:'offer'},
        { component: HomePage, name: 'SpeakerList', segment: 'speakerList' },
        { component: TrackingPage, name: 'TrackingPage', segment: 'tracking' }
      ]
    }),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    ConferenceApp,
    AboutPage,
    AccountPage,
    LoginPage,
    MapPage,
    PopoverPage,
    AppFilterPage,
    SessionDetailPage,
    SignupPage,
    OfferDetailPage,
    TabsPage,
    PushNotificationPage,
    ApplyPage,
    ARPage,
    OfferPage,
    HomePage,
    ARPage,
    TrackingPage
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ConferenceData,
    UserData,
    InAppBrowser,
    SplashScreen,
    LocationTracker,
    BackgroundGeolocation,
    Geolocation,
    Push,
    RestapiServiceProvider,
    BackgroundMode,
    PushNotificationProvider,
    
    
  ]
})
export class AppModule { }
