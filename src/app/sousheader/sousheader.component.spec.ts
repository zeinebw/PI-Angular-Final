import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SousheaderComponent } from './sousheader.component';

describe('SousheaderComponent', () => {
  let component: SousheaderComponent;
  let fixture: ComponentFixture<SousheaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SousheaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SousheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
