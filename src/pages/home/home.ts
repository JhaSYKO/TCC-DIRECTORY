import { Component } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { NavController, NavParams } from 'ionic-angular';
import { NewsApiService } from '../../services/teremuapi.service';
import { NewsApiGlobal } from '../../models/teremuapi-pro.model';

/**
 * Generated class for the WelcomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  posts: any;
  news: NewsApiGlobal= new NewsApiGlobal();

  constructor( private NewsApiService : NewsApiService, public http: Http, public navCtrl: NavController, public navParams: NavParams) {
    this.NewsApiService.getSkills()
    .then(newsFeched => { 
      this.news = newsFeched;
      console.log(this.news);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
  }

}
