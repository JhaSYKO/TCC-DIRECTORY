import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  splash = true;
  nextPage = HomePage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  
  ionViewDidLoad() {
    setTimeout(() => this.splash = false, 4000);
  }

}

