import { Component } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { NavController, NavParams } from 'ionic-angular';
import { NewsApiService } from '../../services/teremuapi.service';
import { NewsApiGlobal } from '../../models/teremuapi-pro.model';
import { InfoProPage } from '../info-pro/info-pro';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

/**
 * Generated class for the WelcomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  selected_value: string;    
  posts: any;
  news: NewsApiGlobal= new NewsApiGlobal();
  database: SQLiteObject;
  progress = 0;

  constructor( private NewsApiService : NewsApiService, private sqlite: SQLite, public http: Http, public navCtrl: NavController, public navParams: NavParams) {
    this.NewsApiService.getBusinesses()
    .then(newsFeched => { 
      this.news = newsFeched;
      console.log(this.news);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
    this.NewsApiService.getBusinesses()
    .then (response => {
      console.log('Données récupérées', JSON.stringify(response.data[0].name));
      for (let i = 0; i < response.data.length; i++) {
          this.news = response;
      }
    })
  }

  showselected($event) {
    this.selected_value = $event;
    console.log(this.selected_value);
  }

  makeSearch() {
    this.navCtrl.push(InfoProPage, {
      value: this.selected_value.toString()})
  }

}
