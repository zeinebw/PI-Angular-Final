import { InvestmentServiceService } from '../Services/investment-service.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { Investment } from '../model/investment';

@Component({
  selector: 'app-investfront',
  templateUrl: './investfront.component.html',
  styleUrls: ['../../assets/css/styleheaderfooter.css',
  '../../assets/css/responsiveheaderfooter.css'
]})
export class InvestfrontComponent implements OnInit {

  listInvest:any;
  form:boolean=false;
  Invest:Investment=new Investment();
  idInvest:number;
  amount:number;
  durationInDays:number;
// @Input() torate : any =0
 torate:any=0;
  closeResult = '';
  page: number = 1;
  count: number = 0;
  tableSize: number = 6;
  tableSizes: any = [3, 6, 9, 12];
  id : number;
constructor(private investmentservice: InvestmentServiceService , private router: Router ,
  private route:ActivatedRoute,
    private modalService: NgbModal ,
    ){}

  public counter: any = 0.0;
  increment() {
    this.counter += 0.01;
  }
  decrement() {
    this.counter -= 0.01;
  }
  onTableDataChange(event: any) {
    this.page = event;
    this.getInvestments();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getInvestments();
  }
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }


  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
ngOnInit(): void {
  this.getInvestments();
  Invest:{
  this.amount,
  this.durationInDays
}
}

getInvestments() {
  this.investmentservice.getInvestments().subscribe(res => this.listInvest = res)
  }

deleteFund(idFund:any){
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, cancel!',
  }).then((result) => {
    if (result.value) {
    this.investmentservice.deleteInvestment(this.idInvest).subscribe(()=> this.getInvestments());
    Swal.fire(
      'Deleted!',
      'The fund has been deleted.',
      'success'
    )
} else if (
   result.dismiss === Swal.DismissReason.cancel)
   { Swal.fire(
      'Cancelled',
      'The fund is safe :)',
      'error')}})}
  

goToaddInvest(){
  this.router.navigate(['investmentAdd']);
  }

addFund(){
    this.investmentservice.addInvestment(this.Invest).subscribe(()=> this.goToDeails());

    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'The investment is created successfully',
      showConfirmButton: false,
      timer: 1500
    })
  }

  addFundPDF(){
    this.investmentservice.addInvestmentwithPDF(this.Invest).subscribe(()=> this.getInvestments());

    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'The investment is created successfully',
      showConfirmButton: false,
      timer: 1500
    })
  }
/*goToaddInves(id:Number){
  this.router.navigate(['AddInves',id]);
}*/
goToaddInves(){
  this.router.navigate(['addinvestfront']);
}



goToDeails(){
 this.router.navigate(['investmentsuser']);
}




}
