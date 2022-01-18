
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { ajax } from 'rxjs/ajax';

import { map, catchError } from 'rxjs/operators';
import { Currency, CurrencyComplete } from 'src/interfaces';


@Injectable({
  providedIn: 'root'
})
export class DataService {
    currencyMap: {[code:string]: {code:string, country:string}} = null;
    constructor(private http: HttpClient) { }
    
    getCurrencies(): Promise<Currency[]> {
        const ret = lastValueFrom(this.http.get<{ currencies: Currency[] }>('/data/currencies.json').pipe(
            map(obj => obj.currencies)
        ))
        ret.then((currencies) => {
            this.currencyMap = {};
            for (let currency of currencies) {
                this.currencyMap[currency.code] = currency;
            }
        })
        return ret;
    }
    private getCurrencyHistory(currencyCode: string): Promise<number[]> {
        return lastValueFrom(this.http.get<{ rates: number[] }>(`/data/${currencyCode}.json`).pipe(
            map(obj => obj.rates)
        ))
    }

    async getCurrencyByCode(currencyCode: string): Promise<CurrencyComplete> {
        if (!this.currencyMap) {
            await this.getCurrencies();
        }
        const currency = this.currencyMap[currencyCode];
        const rates = await this.getCurrencyHistory(currencyCode);
        return {...currency, rates}
    }

    
}



