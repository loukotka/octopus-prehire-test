import { Injectable } from '@angular/core';
import { CurrencyComplete } from 'src/interfaces';

@Injectable({
  providedIn: 'root'
})
export class CurrencyStatsService {

    constructor() { }
    
    getCurrencyRateAvg(currency: CurrencyComplete): number {
        const rates = currency.rates.slice(-12);
        const sum = rates.reduce((previousValue, currentValue) => previousValue + currentValue, 0);
        return sum / rates.length;

    }
}
