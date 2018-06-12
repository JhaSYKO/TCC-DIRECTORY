import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { NewsApiGlobal } from '../../models/newsapi-global.model';
import { NewsApiService } from '../../services/newsapi.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  news: NewsApiGlobal = new NewsApiGlobal();

  constructor(public navCtrl: NavController, private newsApiService: NewsApiService) {
    this.newsApiService.getListePro()
      .then(newsFetched => {
        this.news = newsFetched;
        console.log(this.news);
      }).catch(err => console.log("erreur constructor home ", err));
  }

  // doInfinite(infiniteScroll) {
  //   console.log('Begin async operation');

  //   setTimeout(() => {
  //     for (let i = 0; i < 30; i++) {
  //       this.items.push( this.items.length );
  //     }

  //     console.log('Async operation has ended');
  //     infiniteScroll.complete();
  //   }, 500);
  // }

}
