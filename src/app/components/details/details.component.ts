import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Observable, map } from 'rxjs';
import { HttpCashierService } from '../../shared/services/http.service';

@Component({
  selector: 'csr-purchase-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class CashOutDetailsComponent implements OnInit {
  transaction: any;
  transactionId: string;
  promotion: any;
  nameOperation: any;
  packageSelect: any = { 

  }
  amount: any;
  description: any;
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private httpCashierService: HttpCashierService,
    private location: Location) {
      this.transactionId = this.route.snapshot.paramMap.get("txId")!
      this.httpCashierService.currentTransaction.subscribe(
        transaction => {
          this.transaction = transaction;
          this.amount = (transaction.data.details.amount).toFixed(2);
          this.description = transaction.data.details.description;
        }
      );
    }

  ngOnInit(): void {
  }

  ReturnBack(): void{
    this.location.back();
  }

  ReturnHome(){
    this.router.navigate(['/payment']);
  }

}
