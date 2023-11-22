import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashOutDetailsComponent } from './cash-out-details.component';

describe('ResultComponent', () => {
  let component: CashOutDetailsComponent;
  let fixture: ComponentFixture<CashOutDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashOutDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CashOutDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
