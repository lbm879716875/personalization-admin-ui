import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LeadComponent } from './lead/lead.component';

import { AdminComponent } from './admin/admin.component';


import { DetailMode } from './model/Constants';
import { PromotionComponent } from './promotion/promotion.component';
import { PromotionDetailComponent } from './promotion-detail/promotion-detail.component';
import { PromotionInventoryComponent } from './promotion-inventory/promotion-inventory.component';
import { PromotionInventoryDetailComponent } from './promotion-inventory-detail/promotion-inventory-detail.component';
import { LeadDetailComponent } from './lead-detail/lead-detail.component';
import { LeadtimeEffComponent } from './leadtime-eff/leadtime-eff.component';

const routes: Routes = [
  
    {path: '',component: AdminComponent,children:[

        
      {path:'leadtime',component:LeadComponent},
      {path:'leadtime/add',component:LeadDetailComponent,data:{mode:DetailMode.ADD}},
      {path:'leadtime/view',component:LeadDetailComponent,data:{mode:DetailMode.VIEW}},
      {path:'leadtime/update',component:LeadDetailComponent,data:{mode:DetailMode.UPDATE}},

      {path:'leadtime-eff',component:LeadtimeEffComponent,children:[
        {path:'leadtime-eff/add',component:LeadtimeEffComponent,data:{mode:DetailMode.ADD}},
        {path:'leadtime-eff/view',component:LeadtimeEffComponent,data:{mode:DetailMode.VIEW}},
        {path:'leadtime-eff/update',component:LeadtimeEffComponent,data:{mode:DetailMode.UPDATE}},
      ]},
      
      {path:'promotion',component:PromotionComponent},
      {path:'promotion/add',component:PromotionDetailComponent,data:{mode:DetailMode.ADD}},
      {path:'promotion/:discTag',component:PromotionDetailComponent,data:{mode:DetailMode.VIEW}},
      {path:'promotion/update/:discTag',component:PromotionDetailComponent,data:{mode:DetailMode.UPDATE}},
      {path:'promotion/:discTag/inventory',component:PromotionInventoryComponent},
      {path:'promotion/:discTag/inventory/add',component:PromotionInventoryDetailComponent,data:{mode:DetailMode.ADD}},
      {path:'promotion/:discTag/inventory/update',component:PromotionInventoryDetailComponent,data:{mode:DetailMode.UPDATE}},
    ]}, 
    

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
