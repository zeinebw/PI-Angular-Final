import { Component, OnInit,HostListener, Inject } from '@angular/core';
import { DOCUMENT,CommonModule } from '@angular/common';
import $ from 'jquery';


@Component({
  selector: 'app-header-front',
  templateUrl: './header-front.component.html',
  styleUrls: ['../../assets/css/styleheaderfooter.css',
  '../../assets/css/responsiveheaderfooter.css'
]
})
export class HeaderFrontComponent implements OnInit {

  
  constructor(@Inject(DOCUMENT) private document: Document) { }
  // Sticky Nav
  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: Event) {
    //set up the div "id=nav"
    if (document.body.scrollTop > 150 ||
      document.documentElement.scrollTop > 150) {
      document.getElementById('can-sticky').classList.add('sticky');
    }
    else {
      document.getElementById('can-sticky').classList.remove('sticky');
    }
  }
  // navigation
  navmethod: boolean = true;
  toggleNav() {
    this.navmethod = !this.navmethod;
  }
  // Search
  searchmethod: boolean = true;
  searchToggle() {
    this.searchmethod = !this.searchmethod;
  }

  ngOnInit(): void {
    function mobilemenu() {
      ($(".menu-item-has-children > a") as any).on('click', function (e) {
        var submenu = $(this).next(".sub-menu");
        e.preventDefault();

        submenu.slideToggle(200);
      });
    }
    mobilemenu()
  }
}
