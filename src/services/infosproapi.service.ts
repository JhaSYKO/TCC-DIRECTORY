import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { InfosProApiGlobal } from '../models/infosproapi-global.model';
import { ListeProApiGlobal } from '../models/listeproapi-global.model';
import { AbusApi } from '../models/abusapi.model';
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
    private abus = 'abus/';

    constructor(private http: Http) {

    }

    public getInfosPro(id): Promise<any> {

        const url = `${this.baseUrl}${this.business}${id}`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json() as InfosProApiGlobal)
    }

    public getListePro(): Promise<any> {
        const url = `${this.baseUrl}${this.businesses}`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json() as ListeProApiGlobal)
    }

    // public getListeNamePro(): Promise<any> {
    //     const url = `${this.baseUrl}${this.businesses}`;
    //     return this.http.get(url)
    //         .toPromise()
    //         .then(response => response.json().data as ListeProSkills)
    // }

    public getListeSkills(): Promise<any> {
        const url = `${this.baseUrl}${this.skills}`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json() as ListeSkillsApiGlobal)

    }

    public sendAbus(id): Promise<any> {
        console.log("sendAbus 1 ");
        const url = `${this.baseUrl}${this.abus}${this.business}${id}`;
        console.log("sendAbus url ", url);
        return this.http.get(url)
            .toPromise()
            .then(response => {
                response.json() as AbusApi;
                console.log("sendAbus reponse : ", response.json() as AbusApi);
            
            }).catch(err => console.log("erreur sendAbus : ", JSON.stringify(err)));

    }




    public postSkillFilter(selected_skills): Observable<any> {

        const url = `${this.baseUrl}${this.search}`;
        let body = { 'skills': selected_skills.join(",") };
        
        return this.http.post(url, body)
            .map(response => response.json() as ListeProSkills);
    }





}