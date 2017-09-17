import { ReportyPage } from './../pages/report/report';
import { PipesModule } from './../shared/pipe/pipe.module';
import { SummaryPage } from './../pages/summary/summary';
import { SQLite } from '@ionic-native/sqlite';
import { DatabaseService } from './../shared/service/database.service';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { PayPage } from '../pages/pay/pay';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PayPage,
    SummaryPage,
    ReportyPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      tabsHideOnSubPages: true,
      // mode: 'ios',
      backButtonText: '返回',
      swipeBackEnabled: false
    }),
    PipesModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    PayPage,
    SummaryPage,
    ReportyPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    DatabaseService,
    SQLite
  ]
})
export class AppModule { }
