import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
/**
 * Generated class for the WelcomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  database: SQLiteObject;
  progress = 0;

  constructor(private sqlite: SQLite, private platform: Platform, public navCtrl: NavController, public navParams: NavParams) {
    this.platform.ready().then(() => {
      this.initDb();
  })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
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
      .catch(e => console.log("Table creer",e));
  }

  private createFavorisTable() {

    this.database.executeSql('CREATE TABLE IF NOT EXISTS `favoris` (id INTEGER PRIMARY KEY, last_name TEXT, first_name TEXT, pro_id INTEGER, icone_favoris INTEGER)', {})
    .then(() => {
      console.log('table created');
      this.checkFavorisExist().then((data) => {
        let totalOeuvres = data;
        console.log('totalOeuvres', data);
        if (totalOeuvres == 21) this.redirectToWelcome();
        else this.insertFavorisDatas();
      });
    })
    .catch(e => console.log(e));

  }

  private checkFavorisExist(): any {

    return this.database.executeSql('SELECT * FROM favoris', {})
      .then((data) => {
        return data.rows.length;    
      })
      .catch(e => console.log(e));

  }

  private insertFavorisDatas() {
    let inserts =
      "INSERT INTO `favoris.icone_favoris' VALUES ()";
      this.database.executeSql(inserts, {})
      .then(() => {
        this.redirectToWelcome();
      })
      .catch(e => console.log('error', e));
  }

  private redirectToWelcome() {
    let limit = 10;
    let counter = 0;
    let myInterval = setInterval(() => {
      counter++;
      console.log('counter', counter);
      this.progress = counter * 100 / limit;
      console.log('progress', this.progress);
      if (counter == limit) {
        clearInterval(myInterval);
        this.navCtrl.push(WelcomePage);
      }
    }, 1000);
  }
}
