import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgApexchartsModule } from 'ng-apexcharts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CurrencyListComponent } from './currency-list/currency-list.component';
import { CurrencyDetailComponent } from './currency-detail/currency-detail.component';
import { MainComponent } from './main/main.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { LoadingOverlayComponent } from './loading-overlay/loading-overlay.component';

@NgModule({
    declarations: [
        AppComponent,
        CurrencyListComponent,
        CurrencyDetailComponent,
        MainComponent,
        LineChartComponent,
        LoadingOverlayComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        NgApexchartsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
