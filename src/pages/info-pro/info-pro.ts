import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { BusinessApiSkills } from '../../models/teremuapi-businesses.model';


declare var google;

@Component({
  selector: 'page-info-pro',
  templateUrl: 'info-pro.html',
})
export class InfoProPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  lat: any;
  lng: any;

 constructor(public navCtrl: NavController, public geolocation: Geolocation) {

 }
 
// Faire apparaître la map
 ionViewDidLoad() {
   this.loadMap();
    /* this.geolocation.getCurrentPosition()
    .then(pos => {
     console.log('test2');
      this.lat = pos.coords.latitude;
      this.lng = pos.coords.longitude;
    })
      .catch(err => console.log(err)); */
 }
 
  

  loadMap(){
    console.log('test3');

    //COde pour qfficher lq position du t2l2phone
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
 
      let latLng = new google.maps.LatLng( 48.858366, 2.294470 );
      
      // console.log('lqt et long : ', latLng);
      let mapOptions = {
        center: latLng,
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
 
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      console.log('test4');
      this.addMarker();
      console.log('test6');
    }, (err) => {
      console.log( 'erreur', err);
    }).catch(e =>console.log('erreur loadmap ', e));
 
  }

  addMarker(){
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

  addInfoWindow(marker, content){
 
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });
   
    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
   
  }

}

