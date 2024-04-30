import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gifs, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({providedIn: 'root'})
export class GifsServices {

    public gifList: Gifs[] = [];

    private _tagsHistory: string[] = [];
    private apiKey      : string = 'vC0wAtAOerrLQLC4MVnOzP5NobxM2SGw';
    private serviceUrl  : string = 'https://api.giphy.com/v1/gifs';

    constructor( private http: HttpClient ) { }

    get tagsHistory(){
        return [...this._tagsHistory];
    }

    private organizeHistory(tag: string){
        tag = tag.toLocaleLowerCase();

        if( this._tagsHistory.includes(tag) ){
            this._tagsHistory = this._tagsHistory.filter( oldTag => oldTag != tag );
        }
        this._tagsHistory.unshift(tag);
        this._tagsHistory = this._tagsHistory.slice(0,10);
    }
    
    searchTag( tag:string ):void {
        if(tag.length === 0) return;
        this.organizeHistory(tag);

        const params = new HttpParams()
            .set('api_key', this.apiKey)
            .set('limit', '10')
            .set('q', tag);

        this.http.get<SearchResponse>(`${ this.serviceUrl }/search`, { params })
            .subscribe( resp => { 
                this.gifList = resp.data;
                console.log( { gifs: this.gifList } )
            });


        console.log(this._tagsHistory);
    }

}