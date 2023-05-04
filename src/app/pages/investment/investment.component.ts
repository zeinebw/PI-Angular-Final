import { Component, OnInit,ChangeDetectorRef,ViewChild,Renderer2} from '@angular/core';
import { InvestmentServiceService } from 'src/app/Services/investment-service.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogConfig, DialogPosition  } from '@angular/material/dialog';
import { InterestComponent } from 'src/app/interest/interest.component';
import { Dialog } from '@angular/cdk/dialog';
import { NgbdModalOptionsComponent } from 'src/app/ngbd-modal-options/ngbd-modal-options.component';


@Component({
  selector: 'app-investment',
  templateUrl: './investment.component.html',
  styleUrls: ['../../../assets/css/argon.css'],
  providers: [InvestmentServiceService,MatDialog],
  entryComponents:[NgbdModalOptionsComponent]
})
export class InvestmentComponent implements OnInit {
  interest: number;
  focus = false;
  search: string = '';
  //sortByDateDesc: boolean = false;
  sortByIdDesc: boolean = false;
  formModal : any;
  investments: any[] = [];


  constructor(private renderer: Renderer2, private investmentService: InvestmentServiceService, private sanitizer: DomSanitizer,private router : Router,private changeDetector: ChangeDetectorRef,private dialog: MatDialog,private modalService: NgbModal) {}
  ngOnInit() {
    this.investmentService.getInvestments().subscribe((datas) => {
      console.log(datas);
      this.investments = Object.values(datas);
  });
  
  }
  /*editInvestment(investment: any) {
    this.router.navigate(['/investmentedit', investment.idInvest]);
  }*/
  editInvestment(event: any, investment: any) {
    event.preventDefault();
    this.router.navigate(['/investmentedit', investment.idInvest]);
  }
  

  interestInvestment(investment: any) {
    this.router.navigate(['/interest', investment.idInvest]);
  }

  //deleteInvestment(id:any){
    //this.investmentService.deleteInvestment(id).subscribe( () =>this.investmentService.getInvestments() );
  //}
  getInvestments(){
    this.investmentService.getInvestments().subscribe(data => {
      this.investments = Object.values(data);
    });
  }

  deleteInvestment(investmentId: number) {
    this.investmentService.deleteInvestment(investmentId).subscribe(
      (data:any) => {
        // Remove the deleted investment from the investments array
       
    },
      (error) => {
        console.error(`Failed to delete investment ${investmentId}`, error);
      }
    );
    this.investments = this.investments.filter((investment) => investment.id !== investmentId);
    alert(`investment with ID ${investmentId} deleted`);
    window.location.reload()
  }

  findByType(searchTerm: string) {
    if (!searchTerm) {
      // if search term is empty, return all investments
      this.investmentService.getInvestments().subscribe(
        (investments: any[]) => {
          this.investments = investments;
        },
        (error) => {
          console.error('Failed to get investments', error);
        }
      );
    } else {
      // check if search term is valid before making API call
      const validTypes = ['STOCKS', 'PLACEMENT_POSTCOMPOUNDED', 'PLACEMENT_PRECOMPOUNDED']; // replace with valid types
      if (validTypes.includes(searchTerm)) {
        // search investments by type
        this.investmentService.findByType(searchTerm).subscribe(
          (investments: any[]) => {
            this.investments = investments;
          },
          (error) => {
            console.error(`Failed to search investments by type ${searchTerm}`, error);
          }
        );
      } else {
        console.warn(`Invalid investment type ${searchTerm}`);
        // clear the search results
        this.investments = [];
      }
    }
  }
  //sortByDate() {
    //if (this.sortByDateDesc) {
      //this.investments.sort((a, b) => new Date(b.dateInvest).getTime() - new Date(a.dateInvest).getTime());
    //} else {
      //this.investments.sort((a, b) => new Date(a.dateInvest).getTime() - new Date(b.dateInvest).getTime());
    //}
    //this.sortByDateDesc = !this.sortByDateDesc;
  //}

  sortById() {
    if (this.sortByIdDesc) {
      this.investments.sort((a, b) => b.id - a.id);
    } else {
      this.investments.sort((a, b) => a.id - b.id);
    }
    this.sortByIdDesc = !this.sortByIdDesc;
  }
  /*openInterestDialog() {
    const dialogRef = this.dialog.open(InterestComponent, {
      width: '600px',
      height: '400px',
      data: { 
        investmentId: null,
        beginningPrice: null,
        endingPrice: null,
        dividends: null
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.investmentService.calculateInterest(result.investmentId,result.beginningPrice, result.endingPrice, result.dividends);
      }
    });
  }*/

  openInterestDialog(idInvest: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.open(InterestComponent,dialogConfig);
    dialogConfig.data = {
      idInvest: idInvest,
      beginningPrice: null,
      endingPrice: null,
      dividends: null
    };
  }
  onButtonClick() {
    const modalRef = this.modalService.open(NgbdModalOptionsComponent);
    modalRef.componentInstance.investmentId = 'your-investment-id';
    modalRef.result.then((result) => {
      console.log(`Closed with: ${result}`);
    }, (reason) => {
      console.log(`Dismissed ${reason}`);
    });
  }

  openDialog() {
    this.modalService.open(NgbdModalOptionsComponent);
  }


  openModal1() {
    const modalRef = this.modalService.open(NgbdModalOptionsComponent);
    modalRef.componentInstance.openBackDropCustomClass(modalRef);
  }
  
  getFirstName(invest: any) {
    if (invest && invest.user && invest.user.firstName) {
      return invest.user.firstName;
    } else {
      return "Unknown";
    }
  }
}

  
  
  
