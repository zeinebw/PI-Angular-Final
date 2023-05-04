import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClipboardModule } from 'ngx-clipboard';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { InvestmentComponent } from 'src/app/pages/investment/investment.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InvestmentAddComponent } from 'src/app/investment-add/investment-add.component';
import { EditinvestmentComponent } from 'src/app/editinvestment/editinvestment.component';
import { UserLayoutComponent } from '../user-layout/user-layout.component';
// import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    InvestmentComponent,
    InvestmentAddComponent,
    EditinvestmentComponent,
    IconsComponent,
    MapsComponent
  ]
})

export class AdminLayoutModule {}
