import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from 'angular-crumbs';


@Component({
  selector: 'app-sousheader',
  templateUrl: './sousheader.component.html',
  styleUrls: ['../../assets/css/styleheaderfooter.css',
  '../../assets/css/responsiveheaderfooter.css']
})
export class SousheaderComponent implements OnInit {

  constructor(public breadcrumbService:BreadcrumbService) { }

  
  ngOnInit(): void {
  }

}
