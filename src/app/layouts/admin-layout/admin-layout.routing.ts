import { Routes } from '@angular/router';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { InvestmentComponent } from 'src/app/pages/investment/investment.component';
import { InvestmentAddComponent } from 'src/app/investment-add/investment-add.component';
import { EditinvestmentComponent } from 'src/app/editinvestment/editinvestment.component';
import { InterestComponent } from 'src/app/interest/interest.component';
import { NgbdModalOptionsComponent } from 'src/app/ngbd-modal-options/ngbd-modal-options.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'investment',      component: InvestmentComponent },
    { path : 'investmentAdd', component : InvestmentAddComponent},
    { path:'interest/:id', component: InterestComponent},
    { path:'modal', component: NgbdModalOptionsComponent},
    { path : 'investmentedit/:id', component : EditinvestmentComponent},
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent }
];
