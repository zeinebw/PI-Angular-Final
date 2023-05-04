import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { InterestComponent } from './interest/interest.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgbdModalOptionsComponent } from './ngbd-modal-options/ngbd-modal-options.component';
import { HeaderFrontComponent } from './header-front/header-front.component';
import { CommonModule } from '@angular/common';
import { ContentFrontComponent } from './content-front/content-front.component';
import { FooterFrontComponent } from './footer-front/footer-front.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';
import { InvestfrontComponent } from './investfront/investfront.component';
import { SousheaderComponent } from './sousheader/sousheader.component';
import { SortDirective } from './sort.directive';
import { StockComponent } from './stock/stock.component';
import { ComplaintComponent } from './complaint/complaint.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    SlickCarouselModule,
    HttpClientModule, 
    MatTableModule,
    ComponentsModule,
    MatPaginatorModule,
    NgbModule,
    CommonModule,
    RouterModule,
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    AppRoutingModule,    
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    UserLayoutComponent,
    InterestComponent,
    NgbdModalOptionsComponent,
    HeaderFrontComponent,
    FooterFrontComponent,
    ContentFrontComponent,
    SousheaderComponent,
    SortDirective,
    InvestfrontComponent,
    StockComponent,
    ComplaintComponent
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
