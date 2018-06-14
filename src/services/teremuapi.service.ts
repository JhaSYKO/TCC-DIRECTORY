import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { NewsApiSkill } from '../models/teremuapi-skills.model';
import { BusinessApiSkills } from '../models/teremuapi-businesses.model';


@Injectable()
export class NewsApiService {

    private baseUrl: string = 'http://tccdirectory.1click.pf/api/';
    private businesses: string = 'businesses';
    private skills: 'skills';

    constructor (private http: Http){

    }

    public getBusinesses(): any{
        const url = `${this.baseUrl}${this.businesses}`;

        return this.http.get(url)
        .toPromise()
        .then(response => response.json() as BusinessApiSkills)
        .catch(error => console.log('une erreur est survenue' + error))
    }
}