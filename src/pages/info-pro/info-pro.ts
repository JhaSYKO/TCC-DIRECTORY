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
  @ViewChild('directionsPanel') directionsPanel: ElementRef;
  map: any;
  lat: any;
  lng: any;

 constructor(private BusinessApiSkills: BusinessApiSkills,public navCtrl: NavController, public geolocation: Geolocation) {
  this.BusinessApiSkills = BusinessApiSkills;
  this.startNavigating();
  console.log('this.BusinessApiSkills.lenght');
 }
// Faire apparaître la map
 ionViewDidLoad() {
   this.loadMap();
    this.geolocation.getCurrentPosition()
    .then(pos => {
     console.log('test2');
      this.lat = pos.coords.latitude;
      this.lng = pos.coords.longitude;
    })
      .catch(err => console.log(err));
 }
 
  

  loadMap(){
    console.log('test3');
    this.geolocation.getCurrentPosition()
    .then((position) => {
 
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      console.log('lqt et long : ', latLng);
      let mapOptions = {
        center: latLng,
        zoom: 15,
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

  startNavigating(){
 
    let directionsService = new google.maps.DirectionsService;
    let directionsDisplay = new google.maps.DirectionsRenderer;

    directionsDisplay.setMap(this.map);
    directionsDisplay.setPanel(this.directionsPanel.nativeElement);

    directionsService.route({
        origin: 'position',
        destination: 'pro',
        travelMode: google.maps.TravelMode['FLYING']
    }, (res, status) => {

        if(status == google.maps.DirectionsStatus.OK){
            directionsDisplay.setDirections(res);
        } else {
            console.warn(status);
        }

    });

}
  
}

