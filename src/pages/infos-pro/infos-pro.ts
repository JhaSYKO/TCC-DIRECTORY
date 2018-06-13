import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';


import { InfosProApiGlobal } from '../../models/infosproapi-global.model';
import { InfosProApiService } from '../../services/infosproapi.service';



@Component({
  selector: 'page-infos-pro',
  templateUrl: 'infos-pro.html',
})
export class InfosProPage{

  id : number;

 
  infos: InfosProApiGlobal = new InfosProApiGlobal();

  constructor(public navCtrl: NavController, private infosProApiService: InfosProApiService, public navParams: NavParams, public platform: Platform) {
    platform.ready().then(() => {
      this.id = navParams.get('data');
      console.log("test 1");
      this.infosProApiService.getInfosPro(this.id)
      .then(newsFetched => {
            console.log("test 2");
            this.infos = newsFetched;
            console.log(this.infos);
      }).catch(err => console.log("erreur constructor home ", err));
    })
  }
}