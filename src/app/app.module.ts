import { HttpModule } from '@angular/http';
import { NgModule, ErrorHandler } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { InfosProPage } from '../pages/infos-pro/infos-pro';

import { InfosProApiService } from '../services/infosproapi.service';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CallNumber } from '@ionic-native/call-number';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Geolocation } from '@ionic-native/geolocation';
import { SMS } from '@ionic-native/sms';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    InfosProPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    InfosProPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    CallNumber,
    InAppBrowser,
    SQLite,
    Geolocation,
    SMS,
    InfosProApiService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
