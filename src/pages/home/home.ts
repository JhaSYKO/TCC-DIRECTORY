import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';

import{ InfosProPage } from '../infos-pro/infos-pro';

import { ListeProApiGlobal } from '../../models/listeproapi-global.model';
import { InfosProApiService } from '../../services/infosproapi.service';

import { InfosProApiGlobal } from '../../models/infosproapi-global.model';
import {ListeSkillsApiGlobal} from '../../models/listeskillsapi-global.model';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  selected_value: string;    
  posts: any;
  params: Object;
  liste: ListeProApiGlobal = new ListeProApiGlobal();
  infos: InfosProApiGlobal = new InfosProApiGlobal();
  skills : ListeSkillsApiGlobal = new ListeSkillsApiGlobal();
  

  constructor(public navCtrl: NavController, private infosProApiService: InfosProApiService, public platform: Platform) {
  
    platform.ready().then(() => {
      //recupere liste professionnels
      console.log("home 1");
      this.infosProApiService.getListePro()      
      .then(newsFetched => {
            console.log("home 2");
            this.liste = newsFetched;
            console.log(this.liste);
      }).catch(err => console.log("erreur constructor home ", err));
    
    
      //recupere liste skills
      console.log("home 3");
      this.infosProApiService.getListeSkills()    
      .then(newsFetched => {
            console.log("home 4");
            this.skills = newsFetched;
            console.log("getListeSkills : ",this.skills);
      }).catch(err => console.log("erreur constructor home ", err));
    })
  }
  



  pushPageInfosPro(id){
    // this.navCtrl.push(InfosProPage,{data :id});
    this.navCtrl.push(InfosProPage,{data :id});
  }

  onChange($event) {
    console.log("showselected 1 ");
    this.selected_value = $event;
    console.log("showselected 2 ");
    console.log(this.selected_value);
  }

 


 
    


}
