import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule, Router } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';
import { ContentFrontComponent } from './content-front/content-front.component';
import { InvestmentAddComponent } from './investment-add/investment-add.component';
import { EditinvestmentComponent } from './editinvestment/editinvestment.component';
import { InvestfrontComponent } from './investfront/investfront.component';
import { StockComponent } from './stock/stock.component';
import { InvestmentComponent } from './pages/investment/investment.component';
import { InterestComponent } from './interest/interest.component';


const routes: Routes =[
 
  {
    path: '',
    redirectTo: 'userhome',
    pathMatch: 'full',
  }, 
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('src/app/layouts/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule)
      }
    ]
  }, 
  {path: '',
    component: UserLayoutComponent,
    children: [
      {path: 'userhome', component: ContentFrontComponent},
      {path: 'investuser', component: InvestfrontComponent },
      {path: 'investmentsuser', component: InvestmentComponent },
      {path: 'addinvestfront', component: InvestmentAddComponent },
      {path: 'stocks', component: StockComponent },
      {path: 'interestuser', component: InterestComponent }


    ]
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('src/app/layouts/auth-layout/auth-layout.module').then(m => m.AuthLayoutModule)
      }
    ]
  }, {
    path: '**',
    redirectTo: 'dashboard'
  },

];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
      useHash: true
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
