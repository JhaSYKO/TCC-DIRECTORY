import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';

import{ InfosProPage } from '../infos-pro/infos-pro';

import { ListeProApiGlobal } from '../../models/listeproapi-global.model';
import { InfosProApiService } from '../../services/infosproapi.service';

import { InfosProApiGlobal } from '../../models/infosproapi-global.model';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  params: Object;
  pushPage: any;
  liste: ListeProApiGlobal = new ListeProApiGlobal();
  infos: InfosProApiGlobal = new InfosProApiGlobal();

  constructor(public navCtrl: NavController, private infosProApiService: InfosProApiService, public platform: Platform) {
    // this.pushPage = InfosProPage;
    platform.ready().then(() => {
      console.log("test 1");
      this.infosProApiService.getListePro()
      .then(newsFetched => {
            console.log("test 2");
            this.liste = newsFetched;
            console.log(this.liste);
      }).catch(err => console.log("erreur constructor home ", err));
    })
  }
  
  pushPageInfosPro(id){
    this.navCtrl.push(InfosProPage,{data :id});
    // console.log("id =", id);
    // this.infosProApiService.getInfosPro(id)
    //   .then(newsFetched => {
    //         console.log("test 2");
    //         this.infos = newsFetched;
    //         console.log(this.infos);
            
    //   }).catch(err => console.log("erreur constructor home ", err));
  }

 
    


}
