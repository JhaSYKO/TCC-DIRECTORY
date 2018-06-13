import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

import'rxjs/add/operator/toPromise';
import'rxjs/add/operator/map';

import {InfosProApiGlobal} from '../models/infosproapi-global.model';
import {ListeProApiGlobal} from '../models/listeproapi-global.model';

@Injectable()
export class InfosProApiService{
    private baseUrl = 'http://tccdirectory.1click.pf/api/';
    private business = 'business/';
    private businesses = 'businesses';

    constructor(private http: Http){

    }

    public getInfosPro(id): Promise<any>{

        const url = `${this.baseUrl}${this.business}${id}`;
        return this.http.get(url)
        .toPromise()
        .then(response => response.json() as InfosProApiGlobal)
        .catch(err => console.log("erreur getInfoPro ", err));
    }

    public getListePro(): Promise<any>{
        const url = `${this.baseUrl}${this.businesses}`;
        // let data : any;
        return this.http.get(url)
        .toPromise()
        .then(response => response.json() as ListeProApiGlobal)
        .catch(err => console.log("erreur getListePro ", err));
    }





}