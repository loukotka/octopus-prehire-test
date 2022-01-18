import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { CurrencyComplete } from 'src/interfaces';
import { CurrencyStatsService } from '../services/currency-stats.service';
import { DataService } from '../services/data.service';

@Component({
    selector: 'app-currency-detail',
    templateUrl: './currency-detail.component.html',
    styleUrls: []
})
export class CurrencyDetailComponent implements OnInit {

    currencyCode: string | null = null;
    currency: CurrencyComplete = null;
    loading: boolean = false;
    loadingFailed = false;

    constructor(private route: ActivatedRoute, private dataService: DataService, private currencyStatsService: CurrencyStatsService) { 
    }

    getCurrencyRateAverage() {
        return this.currencyStatsService.getCurrencyRateAvg(this.currency);
    }

    ngOnInit(): void {
        this.route.paramMap.subscribe(async (params) => {
            this.currencyCode = params.get('currencyCode');
            if (this.currencyCode) {
                this.loading = true;
                try {
                    this.currency = await this.dataService.getCurrencyByCode(this.currencyCode);
                    this.loadingFailed = false;
                } catch (err) {
                    this.currency = null;
                    this.loadingFailed = true;
                } finally {
                    this.loading = false;
                }
            }
            else {
                this.loadingFailed = false;
                this.currency = null;
            }
        })

    }

}
