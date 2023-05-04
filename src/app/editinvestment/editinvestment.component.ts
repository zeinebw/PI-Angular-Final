import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { InvestmentServiceService } from 'src/app/Services/investment-service.service';
import { ActivatedRoute, Router,ParamMap } from '@angular/router';


@Component({
  selector: 'app-editinvestment',
  templateUrl: './editinvestment.component.html',
  styleUrls: ['./editinvestment.component.css']
})
export class EditinvestmentComponent implements OnInit {

  reactiveForm: FormGroup;
  idInvest : number ;
  investment: any ;  
  constructor(private router: Router,private formBuilder: FormBuilder,private investmentService: InvestmentServiceService, private route :ActivatedRoute ) { }
  
 ngOnInit(): void {
    this.idInvest = this.route.snapshot.params['id'];
    this.investmentService.getInvestmentById(this.idInvest).subscribe(
      (investment: any) => {
        this.investment = investment ;
        this.reactiveForm = this.formBuilder.group({
          typeInvest : [this.investment.typeInvest, [Validators.required]],
          amount : [this.investment.amount, [Validators.required]],
          durationInDays : [this.investment.durationInDays, [Validators.required]],
        });
      },
      (error) => {
        console.error('Failed to edit investment', error);
      }
    );
  }
  Edit() {
    const updatedInvestment = {
      idInvest: this.investment.idInvest,
      typeInvest: this.reactiveForm.get('typeInvest').value,
      amount: this.reactiveForm.get('amount').value,
      durationInDays: this.reactiveForm.get('durationInDays').value,
    };
    this.investmentService.editInvestment(updatedInvestment).subscribe(
      () => {
        console.log('Investment updated successfully');
        this.gotoINVESTMENTList();      },
      (error) => {
        console.error('Failed to update investment', error);
      }
    );
  }
  
  
  gotoINVESTMENTList() {
    this.router.navigate(['/investment']); 
  }
  
}
  