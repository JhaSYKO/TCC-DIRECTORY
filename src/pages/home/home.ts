import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

import { InfosProPage } from '../infos-pro/infos-pro';

import { InfosProApiService } from '../../services/infosproapi.service';
import { ListeProApiGlobal } from '../../models/listeproapi-global.model';
import { InfosProApiGlobal } from '../../models/infosproapi-global.model';
import { ListeSkillsApiGlobal } from '../../models/listeskillsapi-global.model';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  selected_skills: string;
  posts: any;
  params: Object;
  liste: ListeProApiGlobal = new ListeProApiGlobal();
  infos: InfosProApiGlobal = new InfosProApiGlobal();
  skills: ListeSkillsApiGlobal = new ListeSkillsApiGlobal();
  database: SQLiteObject;
  favoris = [];
  searchQuery: string = '';
  items: string[];


  constructor(public navCtrl: NavController, private infosProApiService: InfosProApiService, public sqlite: SQLite, public platform: Platform) {

    platform.ready().then(() => {
      //recupere liste professionnels
      console.log("home 1");
      this.initDb();
      this.listeSkill();//recupere liste skills
      this.listePro();//recupere liste pro
      this.initializeItems();




    })
  }

  initializeItems() {
    this.infosProApiService.getListePro()
      .then(newsFetched => {
        this.liste = newsFetched;
        console.log("liste data ", this.liste.data[1].name);
        for(let i=0;i<this.liste.data.length;i++)
    this.items[i] = this.liste.data[i].name;
      });
      
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }


  initDb() {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        this.database = db
        this.createFavorisTable(); //on lance la fonction pour créer la table
        // this.dropOeuvresTable();



      })
      .catch(e => console.log("erreur creer database", e));
  }

  //création de la table
  createFavorisTable() {
    this.database.executeSql('CREATE TABLE IF NOT EXISTS favoris (id INTEGER PRIMARY KEY, pro_Id INTEGER, abus INTEGER, checked INTEGER)', {})
      .then(() => {
        this.insertFavorisDatas();
      })
      .catch(e => console.log('erreur create table', e));
  }

  insertFavorisDatas() {
    
    this.displayFavorisTable();
    this.dropFavorisTable();
    let inserts = "INSERT INTO `favoris` VALUES (10,10,1)";
    this.database.executeSql(inserts, {})
    .then(() => {
      this.displayFavorisTable();
    })
      .catch((e) => console.log('error insertFavorisDatas :', e));

  }


  displayFavorisTable() {
    this.database.executeSql("SELECT * FROM favoris", {})
      .then((data) => {
        let totalFavoris = data.rows.length; 
        console.log("taille de la table favoris : ", totalFavoris);
        for (let i = 0; i < data.rows.length; i++) {
          this.favoris.push(data.rows.item(i));
        }
      })
      .catch(e => console.log("erreur display ",e));
  }

  dropFavorisTable(): any {
    this.database.executeSql('DROP TABLE `favoris`', {}) // return de la fonction
      .then(() => {
        console.log("table oeuvres dropped");
      })
      .catch(e => console.log('table oeuvres pas dropped', e));
  }

  listeSkill() {
    this.infosProApiService.getListeSkills()
      .then(newsFetched => {
        this.skills = newsFetched;
      });
  }

  listePro() {
    this.infosProApiService.getListePro()
      .then(newsFetched => {
        this.liste = newsFetched;
      });
  }


  pushPageInfosPro(id) {
    // this.navCtrl.push(InfosProPage,{data :id});
    this.navCtrl.push(InfosProPage, { data: id });
  }

  onChange(event) {
    let test = event[0];

    if (test) {

      this.selected_skills = event;

      this.infosProApiService.postSkillFilter(this.selected_skills)
        .subscribe(
          res => {
            console.log("home-postSkillFilter-then :", res);
            this.liste.data = res;
            console.log("getListeSkills : ", this.liste.data);
          },
          err => console.log("error", err)
        )

    } else {
      this.listePro();
    }

  }
}

