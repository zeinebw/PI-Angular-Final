import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { InvestmentServiceService } from 'src/app/Services/investment-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-investment-add',
  templateUrl: './investment-add.component.html',
  styleUrls: ['./investment-add.component.css']
})
export class InvestmentAddComponent implements OnInit {

  reactiveform: FormGroup;

  constructor(private router: Router,private formBuilder: FormBuilder,private investmentService: InvestmentServiceService) { }

  ngOnInit(): void {
    this.reactiveform = this.formBuilder.group({
      typeInvest: ['', Validators.required],
      amount: ['', Validators.required],
      dateInvest: ['', Validators.required],
      durationInDays: ['', Validators.required],
    });
  }
  Save() {
    if (this.reactiveform.valid) { 
      const investment = this.reactiveform.value;
      this.investmentService.addInvestment(investment).subscribe(
        () => {
          console.log('Investment saved successfully'); 
          this.gotoINVESTMENTList(); 
        },
        (error) => {
          console.error('Failed to save investment', error);
        });
    }
  }
  
  gotoINVESTMENTList() {
    this.router.navigate(['/investment']); 
  }
  
}
  