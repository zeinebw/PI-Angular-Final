import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestfrontComponent } from './investfront.component';

describe('InvestfrontComponent', () => {
  let component: InvestfrontComponent;
  let fixture: ComponentFixture<InvestfrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvestfrontComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvestfrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
