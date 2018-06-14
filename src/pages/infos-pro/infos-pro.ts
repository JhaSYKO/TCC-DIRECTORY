import { NavController, NavParams, Platform, ActionSheetController } from 'ionic-angular';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { CallNumber } from '@ionic-native/call-number';
import { SMS } from '@ionic-native/sms';


import { InfosProApiGlobal } from '../../models/infosproapi-global.model';
import { InfosProApiService } from '../../services/infosproapi.service';


declare var google;


@Component({
  selector: 'page-infos-pro',
  templateUrl: 'infos-pro.html',
})
export class InfosProPage {

  id: number;
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  lat: any;
  lng: any;
  infos: InfosProApiGlobal = new InfosProApiGlobal();
  idPro: number;


  constructor(public navCtrl: NavController,
    private iap: InAppBrowser,
    private sms: SMS,
    private callnumber: CallNumber, 
    public geolocation: Geolocation, 
    private infosProApiService: InfosProApiService, 
    public navParams: NavParams, 
    public platform: Platform,
    public actionsheetCtrl: ActionSheetController) {

    platform.ready().then(() => {
      this.id = navParams.get('data'); //récupère la donnée "data" envoyée de la page Home
      this.infosProApiService.getInfosPro(this.id)
        // this.infosProApiService.postSkillFilter()
        .then(newsFetched => {
          this.infos = newsFetched;
          console.log(this.infos);
        }).catch(err => console.log("erreur constructor home ", err));
    });

  }

  //PARTIE GEOLOCALISATION

  // Faire apparaître la map
  ionViewDidLoad() {
    this.loadMap();
  }

  loadMap() {
    console.log('test3');

    //Code pour afficher la position de l'utilisateur
    /* this.geolocation.getCurrentPosition()
    .then((position) => {

      let latLng = new google.maps.LatLng( position.coords.latitude ,  position.coords.longitude );
    
      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      } */

    //Afficher comme si nous etions sur la tour eiffel
    
    this.geolocation.getCurrentPosition()
      .then((position) => {

        let latLngTE = new google.maps.LatLng(48.858366, 2.294470); //coordnnées tour eiffel
        let latLngPro = new google.maps.LatLng(50, 0); //coordnnées tour eiffel

        // console.log('lqt et long : ', latLng);
        let mapOptionsTE = {
          center: latLngTE,
          zoom: 10,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }

        let mapOptionsPro = {
          center: latLngPro,
          zoom: 10,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        

        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptionsTE);
        console.log('test4');
        this.addMarker();
        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptionsPro);
        console.log('test5');
        this.addMarker();
        console.log('test6');
      }, (err) => {
        console.log('erreur', err);
      }).catch(e => console.log('erreur loadmap ', e));

  }

  addMarker() {
    console.log('test5');
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });

    let content = "<h4>vous etes ici</h4>";

    this.addInfoWindow(marker, content);
    console.log('test7');

  }

  addInfoWindow(marker, content) {

    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });

  }


  //PARTIE PLUGINS INFO

  openMenu() {
    let actionSheet = this.actionsheetCtrl.create({
      title: 'Mobile',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Appeler',
          icon: !this.platform.is('ios') ? 'call' : null,
          handler: () => {
            this.callnumber.callNumber(this.infos.mobile, true)
              .then(res => console.log('Launched dialer!', res))
              .catch(err => console.log('Error launching dialer', err));
            console.log('call clicked');
          }
        },
        {
          text: 'SMS',
          icon: !this.platform.is('ios') ? 'chatboxes' : null,
          handler: () => {
            console.log('Sms clicked');
          }
        },
        {

          text: 'Annuler',
          role: 'cancel',
          icon: !this.platform.is('ios') ? 'close' : null,
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  openFB() {
    this.iap.create(this.infos.facebook_url)
  }

  openLI() {
    this.iap.create(this.infos.linkedin_url)
  }

  openTW() {
    this.iap.create(this.infos.twitter_url)
  }

  openWS() {
    this.iap.create(this.infos.website_url)
  }

  dial() {
    this.callnumber.callNumber(this.infos.mobile, true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));

  }

  sendsms() {
    this.sms.send(this.infos.mobile, 'Hello world')
      .then(res => console.log('sms sent!', res))

  }


  getAbus(event){
    this.idPro = event;
    console.log('idPro',  this.idPro);
    this.infosProApiService.sendAbus(this.idPro)
  }



}