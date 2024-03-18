import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gifs, SearchResponse } from '../../interfaces/gifs.interfaces';

@Injectable({ providedIn: 'root' })
export class GifsService {

    private _tagsHistory: string[] = [];
    private apiKey: string = "DsXG5LARj5spnGF5xG9WKXQReRgyP8La";
    private serviceUrl: string = "https://api.giphy.com/v1/gifs";
    public listGifs: Gifs[] = [];

    constructor(private http: HttpClient) {

        this.loadLocalStorage();

    }

    get tagHistory() {
        return [...this._tagsHistory];
    }


    searchTag(tag: string): void {

        this._tagsHistory.unshift(tag);
        this.organizeHistory(tag);

        // fetch('http://api.giphy.com/v1/gifs/search?api_key=DsXG5LARj5spnGF5xG9WKXQReRgyP8La&q=valorant&limit=10')
        // .then( resp => resp.json() )
        // .then( data => console.log(data) )

        const params = new HttpParams()
            .set('api_key', 'DsXG5LARj5spnGF5xG9WKXQReRgyP8La')
            .set('limit', 10)
            .set('q', tag);

        this.http.get<SearchResponse>(`${this.serviceUrl}/search?`, { params })
            .subscribe(resp => {

                // console.log(resp.data) 
                this.listGifs = resp.data;
                console.log({ gifs: this.listGifs })

            });

    }

    private organizeHistory(tag: string) {

        tag = tag.toLowerCase();

        if (tag.includes(tag)) {

            this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag);

        }

        this._tagsHistory.unshift(tag); //unshift pone un valor al principio del arreglo
        this._tagsHistory = this._tagsHistory.splice(0, 10); //splice limita el arreglo

        this.saveLocaLStorage();

    }

    private saveLocaLStorage(): void {
        localStorage.setItem('history', JSON.stringify(this._tagsHistory));
    }

    private loadLocalStorage(): void {

        if (!localStorage.getItem('history')) return; //Pregunta si no viene valor entre si es verdadero
        const temporal = localStorage.getItem('history');

        this._tagsHistory = JSON.parse(localStorage.getItem('history')!); //El signo de exclamacion al final se refiere a que el valor no sera nulo

        if (this._tagsHistory.length === 0) return;

        this.searchTag(this._tagsHistory[0]);

    }

}