import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material.module';

import { AdminComponent } from './admin/admin.component';
import { HttpClientModule } from '@angular/common/http';

import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { PromotionComponent } from './promotion/promotion.component';
import { PromotionDetailComponent } from './promotion-detail/promotion-detail.component';
import { PromotionInventoryComponent } from './promotion-inventory/promotion-inventory.component';
import { PromotionInventoryDetailComponent } from './promotion-inventory-detail/promotion-inventory-detail.component';
import { DatePipe } from '@angular/common';
import { TmplCmpntIdDropDown } from './dropdown/TmplCmpntId';
import { SuplrIdDropDown } from './dropdown/SuplrId';
import { RegionDropDown } from './dropdown/Region';
import { LeadComponent } from './lead/lead.component';
import { LeadDetailComponent } from './lead-detail/lead-detail.component';
import { LeadtimeEffComponent } from './leadtime-eff/leadtime-eff.component';
import { LeadtimeEffDetailComponent } from './leadtime-eff-detail/leadtime-eff-detail.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [
    AppComponent,


    AdminComponent,

    PromotionComponent,
    PromotionDetailComponent,
    PromotionInventoryComponent,
    PromotionInventoryDetailComponent,
    TmplCmpntIdDropDown,
    SuplrIdDropDown,
    RegionDropDown,
    LeadComponent,
    LeadDetailComponent,
    LeadtimeEffComponent,
    LeadtimeEffDetailComponent,
    ConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500}},
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
