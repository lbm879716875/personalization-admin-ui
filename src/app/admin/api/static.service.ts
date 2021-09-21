import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class StaticService {
    constructor(private http:HttpClient){

    }
    getSuplerIds():Promise<string[]>{
       return this.http.get<string[]>('/apis/static/suplerIds').toPromise();
    }

    getTemplateIds():Promise<string[]>{
        return this.http.get<string[]>('/apis/static/templateIds').toPromise();
    }
    getComponentIds():Promise<string[]>{
        return this.http.get<string[]>('/apis/static/componentIds').toPromise();
    }
    getRegions():Promise<string[]>{
        return this.http.get<string[]>('/apis/static/regions').toPromise();
    }

    getDbs():Promise<string[]>{
        return this.http.get<string[]>('/apis/static/dbs').toPromise();
    }
} 