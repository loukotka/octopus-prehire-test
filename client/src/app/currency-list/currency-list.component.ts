import { Component, OnInit } from '@angular/core';
import { Currency } from 'src/interfaces';
import { DataService } from '../services/data.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { SearchService } from '../services/search.service';
@Component({
    selector: 'app-currency-list',
    templateUrl: './currency-list.component.html',
    styleUrls: []
})
export class CurrencyListComponent implements OnInit {
    allCurrencies: Currency[] = [];
    filteredCurrencies: Currency[] = [];
    selectedCurrency: Currency = null;
    loading: boolean = false;
    constructor(private dataService: DataService, private searchService: SearchService, private route: ActivatedRoute, private router: Router) { }

    async ngOnInit() {
        this.loading = true;
        this.allCurrencies = await this.dataService.getCurrencies();
        this.filteredCurrencies = this.searchService.findCurrencies('', this.allCurrencies);
        this.loading = false;
        this.route.paramMap.subscribe(async (params) => {
            const currencyCode = params.get('currencyCode');
            this.selectedCurrency = this.allCurrencies.find(c => c.code === currencyCode);
        });
    }
    onCurrencyClick(currency: Currency) {
        this.selectedCurrency = currency;
        this.router.navigate([currency.code]);

    }
    onSearchChange(target: any) {
        const value = target.value;
        this.filteredCurrencies = this.searchService.findCurrencies(value, this.allCurrencies);
    }

}
