import { SummaryPage } from './../summary/summary';
import { PayPage } from './../pay/pay';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  goToPay(type: string) {
    this.navCtrl.push(PayPage, { type: type });
  }

  goToSummary() {
    this.navCtrl.push(SummaryPage);
  }

}
