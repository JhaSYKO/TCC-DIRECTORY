import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';

import { InfosProPage } from '../infos-pro/infos-pro';


import { ListeProApiGlobal } from '../../models/listeproapi-global.model';
import { InfosProApiService } from '../../services/infosproapi.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  params: Object;
  pushPage: any;
  liste: ListeProApiGlobal = new ListeProApiGlobal();

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

 
    


}
