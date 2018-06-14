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
    this.initDb();
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

  initDb() {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        this.database = db;
        this.createFavorisTable();
      })
      .catch(e => console.log(e));
  }

  private createFavorisTable() {

    this.database.executeSql('CREATE TABLE IF NOT EXISTS favoris (id INTEGER PRIMARY KEY, lastname TEXT, firstname TEXT, checked INTEGER)', {})
      .then(() => {
        console.log('table created');
        this.checkFavorisExist().then((data) => {
          let totalFavoris = data;
          console.log('totalOeuvres', data);
          if (totalFavoris == 50) this.redirectToTabs();
          else this.insertFavorisDatas();
        });
      })
      .catch(e => console.log(e));

  }
  private checkFavorisExist(): any {

    return this.database.executeSql('SELECT * FROM oeuvres', {})
      .then((data) => {
        return data.rows.length;
      })
      .catch(e => console.log(e));

  }
  private insertFavorisDatas() {
    let inserts =
      "INSERT INTO `favoris` VALUES (1,'ALVAREZ','Jean-Pierre','9213750369.jpg',9213750369,0),"
    this.database.executeSql(inserts, {})
      .then(() => {
        this.redirectToTabs();
      })
      .catch(e => console.log('error', e));
  }
  private redirectToTabs() {
    let limit = 5;
    let counter = 0;
    let myInterval = setInterval(() => {
      counter++;
      console.log('counter', counter);
      this.progress = counter * 100 / limit;
      console.log('progress', this.progress);
      if (counter == limit) {
        clearInterval(myInterval);
        this.navCtrl.push(HomePage);
      }
    }, 1000);
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
