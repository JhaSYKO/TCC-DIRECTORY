import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  database: SQLiteObject;

  constructor(public navCtrl: NavController, private sqlite: SQLite, private platform: Platform,) {
    this.platform.ready().then(() => {
      this.initDb();

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
      .catch(e => console.log("Table creer",e));
  }

  private createFavorisTable() {

    this.database.executeSql('CREATE TABLE IF NOT EXISTS favoris (id INTEGER PRIMARY KEY, last_name TEXT, first_name TEXT, pro_id INTEGER, icone_favoris INTEGER)', {})
      .then(() => {
        this.checkFavorisExist();
        console.log('table created');
      })
      .catch(e => console.log(e));

  }

  private checkFavorisExist(): any {

    return this.database.executeSql('SELECT * FROM favoris', {})
      .then((data) => {
        this.insertFavorisDatas();
        return data.rows.length;
      })
      .catch(e => console.log(e));

  }

  private insertFavorisDatas() {
    let inserts =
      "INSERT INTO `favoris.icone_favoris' VALUES ()";
      this.database.executeSql(inserts, {})
      .then(() => {
      })
      .catch(e => console.log('error', e));
  }
}
