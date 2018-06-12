import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { NewsApiSkill} from '../models/teremuapi-skills.model';

@Injectable()
export class NewsApiService {

    private baseUrl: string = 'http://tccdirectory.1click.pf/api/';
    private competence: string = 'skills';

    constructor (private http: Http){

    }

    public getSkills(): any{
        const url = `${this.baseUrl}${this.competence}`;

        return this.http.get(url)
        .toPromise()
        .then(response => response.json() as NewsApiSkill)
        .catch(error => console.log('une erreur est survenue' + error))
    }
}