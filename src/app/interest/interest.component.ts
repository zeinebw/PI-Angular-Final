import { Component, OnInit,Renderer2   } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map , catchError } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { InvestmentServiceService } from '../Services/investment-service.service';


@Component({
  selector: 'app-interest',
  templateUrl: './interest.component.html',
  styleUrls: ['./interest.component.css']
})
export class InterestComponent implements OnInit {
  reactiveform: FormGroup;
  idInvest : number ;
  typeInvest : string;
  public interest: number;
  public total:number;
  errorMessage:string;
  public interestGain: any[] = [];
  public interestRate: number;
  public gain: any;
  investment: any;
  isForm1Displayed = false;
  isForm2Displayed = false;
  isForm3Displayed = false;

  constructor(private router: Router,private formBuilder: FormBuilder,
    private investmentService: InvestmentServiceService, 
    private route :ActivatedRoute, private renderer: Renderer2,
    ) { }

  ngOnInit(): void {
    this.idInvest = this.route.snapshot.params['id'];    
    this.investmentService.getInvestmentById(this.idInvest).subscribe((investment: any) => {
      this.investment = investment;
      console.log(this.investment);
    }, (error) => {
      console.error('Failed to retrieve investment:', error);
    });
    

    this.reactiveform = this.formBuilder.group({
      beginningPrice: ['', Validators.required],
      endingPrice: ['', Validators.required] ,
      dividends: ['', Validators.required] ,
      compoundingPeriodInMonths: ['', Validators.required]  });
  }
  
  calculateInterest() {
    if (this.isPlacementType()) {
      this.reactiveform.get('beginningPrice').setValue(0);
      this.reactiveform.get('endingPrice').setValue(0);
    }
    
    const beginningPrice = this.reactiveform.get('beginningPrice').value;
    const endingPrice = this.reactiveform.get('endingPrice').value;  
    this.investmentService.calculateInterest(this.idInvest, beginningPrice, endingPrice)
      .subscribe(interest => {
        this.interest = interest;
      });
  }
  
  calculateRate() {
    let beginningPrice = 0;
    let endingPrice = 0;
    if (this.isPlacementType()) {
      this.investmentService.calculatePlcementInterestRate(this.idInvest)
      .subscribe(interest => {
        this.interestRate = interest;
      }, error => {
        console.error('Error occurred while fetching placement gain:', error);
      });
    } else {
      beginningPrice = this.reactiveform.get('beginningPrice').value;
      endingPrice = this.reactiveform.get('endingPrice').value;  
      this.investmentService.calculateStockInterestRate(this.idInvest, beginningPrice, endingPrice)
        .subscribe(interest => {
          this.interestRate = interest;
        }, error => {
          console.error('Error occurred while fetching stock interest rate:', error);
        });
      }
    }
  
  gotoINVESTMENTList() {
    this.router.navigate(['/investment']); 
  }

  isPlacementType(): boolean {
    console.log(this.investment.typeInvest);
    // Check if the investment is of type PLACEMENT_POSTCOMPOUNDED or PLACEMENT_PRECOMPOUNDED
    if (this.investment.typeInvest === 'PLACEMENT_POSTCOMPOUNDED' || this.investment.typeInvest === 'PLACEMENT_PRECOMPOUNDED') {
      // Set the readOnly attribute to true for the beginningPrice and endingPrice inputs
      const beginningPrice = this.renderer.selectRootElement('#beginningPrice');
      const endingPrice = this.renderer.selectRootElement('#endingPrice');
      this.renderer.setProperty(beginningPrice, 'readOnly', true);
      this.renderer.setProperty(endingPrice, 'readOnly', true);
      return true;
    } else {
      return false;
    }
  }

  isSTOCKType(): boolean {
    console.log(this.investment.typeInvest);
    if (this.investment.typeInvest === 'STOCKS') {
      // Set the readOnly attribute to true for the beginningPrice and endingPrice inputs
      const compoundingPeriodInMonths = this.renderer.selectRootElement('#compoundingPeriodInMonths');
      this.renderer.setProperty(compoundingPeriodInMonths, 'readOnly', true);
      return true;
    } else {
      return false;
    }
  }
  showForm1() {
    this.isForm1Displayed = !this.isForm1Displayed;
  }
  showForm2() {
    this.isForm2Displayed = !this.isForm2Displayed;
  }
  showForm3() {
    this.isForm3Displayed = !this.isForm3Displayed;
  }

  calculateGain() {
    let beginningPrice = 0;
    let endingPrice = 0;
    let dividends = 0;
    if (this.isPlacementType()) {
      const compoundingPeriodInMonths = this.reactiveform.get('compoundingPeriodInMonths').value;
      this.investmentService.calculatePlcementGain(this.idInvest,compoundingPeriodInMonths)
      .subscribe(interest => {
        this.interest = interest;
      }, error => {
        console.error('Error occurred while fetching placement gain:', error);
      });
    } else {
      beginningPrice = this.reactiveform.get('beginningPrice').value;
      endingPrice = this.reactiveform.get('endingPrice').value; 
      dividends = this.reactiveform.get('dividends').value; 
      this.investmentService.calculateStockGain(this.idInvest, beginningPrice, endingPrice,dividends)
      .subscribe(result => {
        this.interestGain = Object.entries(result);
      });
    }
  }

  calculatePlacementGain(){
    const compoundingPeriodInMonths = this.reactiveform.get('compoundingPeriodInMonths').value;
    this.investmentService.calculatePlacementGain(this.idInvest, compoundingPeriodInMonths)
    .subscribe(gain => {
      this.gain = gain;
      console.log(gain);
    }, error => {
      console.error('Error occurred while fetching placement gain:', error);
    });

  }
  }
  
  

  


