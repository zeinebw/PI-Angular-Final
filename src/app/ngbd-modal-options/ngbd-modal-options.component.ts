import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MatDialogRef } from '@angular/material/dialog';
import { InvestmentAddComponent } from '../investment-add/investment-add.component';

@Component({
  selector: 'app-ngbd-modal-options',
  templateUrl: './ngbd-modal-options.component.html',
  styleUrls: ['./ngbd-modal-options.component.css'],
  //encapsulation: ViewEncapsulation.None,
  /*styles: [
      `
          .dark-modal .modal-content {
              background-color: black;
              color: white;
          }
          .dark-modal .close {
              color: white;
          }
          .light-blue-backdrop {
              background-color: white;
          }
      `,
  ],*/
})
export class NgbdModalOptionsComponent implements OnInit {
  beginningPrice: number;
  endingPrice: number;
  dividends: number;
  result: number;
  reactiveform: FormGroup;

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
  ) {}

  ngOnInit(): void {
    this.reactiveform = this.formBuilder.group({
      beginningPrice: ['', Validators.required],
      endingPrice: ['', Validators.required],
      dividends: ['', Validators.required],
    });
  }

  cancel(): void {
  }
}
