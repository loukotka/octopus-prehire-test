import { Injectable } from '@angular/core';
import { Currency } from 'src/interfaces';
@Injectable({
  providedIn: 'root'
})
export class SearchService {

    constructor() { }
    
    findCurrencies(searchTerm: string, currencies: Currency[]): Currency[] {

        let filteredCurrencies;
        if (searchTerm) {
            const term = this.normalize(searchTerm);
            filteredCurrencies = currencies.filter(currency => {
                if (this.normalize(currency.code).indexOf(term) >= 0 || this.normalize(currency.country).indexOf(term) >= 0) {
                    return true;
                }
                return false;
            });
        }
        else {
            filteredCurrencies = [...currencies];
        }
        filteredCurrencies.sort((c1, c2) => {
            return this.normalize(c1.country) > this.normalize(c2.country) ? 1 : -1;
        });
        return filteredCurrencies;

    }

    normalize(str: string): string {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    }
}
