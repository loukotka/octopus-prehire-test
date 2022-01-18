import { Component, Input, ViewChild } from "@angular/core";

import {
    ChartComponent,
    ApexAxisChartSeries,
    ApexChart,
    ApexXAxis,
    ApexDataLabels,
    ApexTitleSubtitle,
    ApexStroke,
    ApexGrid
} from "ng-apexcharts";
import { CurrencyComplete } from "src/interfaces";

export type ChartOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    dataLabels: ApexDataLabels;
    grid: ApexGrid;
    stroke: ApexStroke;
    title: ApexTitleSubtitle;
};

@Component({
    selector: "app-line-chart",
    templateUrl: "./line-chart.component.html",
    styleUrls: []
})
export class LineChartComponent {
    chartOptions: ChartOptions;
    _currency: CurrencyComplete;
    get currency(): CurrencyComplete {
        return this._currency;
    }
    @Input() set currency(currency: CurrencyComplete) {
        this._currency = currency;
        this.updateChartOptions(currency);
    }

    constructor() {
        
    }

    updateChartOptions(currency: CurrencyComplete) {
        console.log(currency)
        this.chartOptions = {
            series: [
                {
                    name: "",
                    data: currency.rates.map(v => parseFloat(v.toFixed(3)))
                }
            ],
            chart: {
                height: 400,
                type: "line",
                animations: {
                    enabled: false,
                },
                zoom: {
                    enabled: false
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: "straight"
            },
            title: {
                text: "Historie kurzu "+currency.country,
                align: "left"
            },
            grid: {
                row: {
                    colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
                    opacity: 0.5
                }
            },
            xaxis: {}
        };
    }
}
