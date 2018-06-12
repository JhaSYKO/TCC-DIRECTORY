import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

import'rxjs/add/operator/toPromise';
import'rxjs/add/operator/map';

import {NewsApiGlobal} from '../models/newsapi-global.model';

@Injectable()
export class NewsApiService{
    private baseUrl = 'http://tccdirectory.1click.pf/api/';
    private source = 'businesses';

constructor(private http: Http){

}

public getListePro(): Promise<any>{
    const url = `${this.baseUrl}${this.source}`;
    return this.http.get(url)
    .toPromise()
    .then(response => response.json() as NewsApiGlobal)
    .catch(err => console.log("erreur getListePro ", err));

}

}