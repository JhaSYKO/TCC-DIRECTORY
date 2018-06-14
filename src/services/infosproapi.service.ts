import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { InfosProApiGlobal } from '../models/infosproapi-global.model';
import { ListeProApiGlobal } from '../models/listeproapi-global.model';
import { ListeProSkills } from '../models/listepro-skills.model';
import { ListeSkillsApiGlobal } from '../models/listeskillsapi-global.model';
import { ObservableInput, Observable } from 'rxjs/Observable';

@Injectable()
export class InfosProApiService {
    private baseUrl = 'http://tccdirectory.1click.pf/api/';
    private business = 'business/';
    private businesses = 'businesses';
    private search = 'search';
    private skills = 'skills';

    constructor(private http: Http) {

    }

    public getInfosPro(id): Promise<any> {

        const url = `${this.baseUrl}${this.business}${id}`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json() as InfosProApiGlobal)
            .catch(err => console.log("erreur getInfoPro ", err));
    }

    public getListePro(): Promise<any> {
        const url = `${this.baseUrl}${this.businesses}`;
        // let data : any;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json() as ListeProApiGlobal)
            .catch(err => console.log("erreur getListePro ", err));
    }

    public getListeSkills(): Promise<any> {
        const url = `${this.baseUrl}${this.skills}`;
        // let data : any;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json() as ListeSkillsApiGlobal)
            .catch(err => console.log("erreur getListeSkills ", err));

    }





    public postSkillFilter(selected_skills): Observable<any> {

        const url = `${this.baseUrl}${this.search}`;
        let body = { 'skills': selected_skills.join(",") };
        
        return this.http.post(url, body)
            .map(response => response.json() as ListeProSkills);
    }





}