import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

import'rxjs/add/operator/toPromise';
import'rxjs/add/operator/map';

import {InfosProApiGlobal} from '../models/infosproapi-global.model';
import {ListeProApiGlobal} from '../models/listeproapi-global.model';
import {ListeProData} from '../models/listepro-skills.model';
import {ListeSkillsApiGlobal} from '../models/listeskillsapi-global.model';

@Injectable()
export class InfosProApiService{
    private baseUrl = 'http://tccdirectory.1click.pf/api/';
    private business = 'business/';
    private businesses = 'businesses';
    private search = 'search';
    private skills = 'skills';

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

    public getListeSkills(): Promise<any>{
        const url = `${this.baseUrl}${this.skills}`;
        // let data : any;
        return this.http.get(url)
        .toPromise()
        .then(response => response.json() as ListeSkillsApiGlobal)
        .catch(err => console.log("erreur getListeSkills ", err));
        
    }





    public postSkillFilter(): Promise<any>{

        const url = `${this.baseUrl}${this.search}`;
        let data = {'skills' : "1 , 2" };
        return this.http.post(url, data)
        .toPromise()
        .then(response => {
            response.json() as ListeProApiGlobal;
            
            console.log('postSkillFilter liste  : ', response.json() as ListeProApiGlobal);
            
        })
        .catch(err => console.log("erreur getInfoPro ", err));
    }





}