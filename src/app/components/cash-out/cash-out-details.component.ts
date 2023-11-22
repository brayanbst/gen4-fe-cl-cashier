import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'csr-purchase-details',
  templateUrl: './cash-out-details.component.html',
  styleUrls: ['./cash-out-details.component.scss']
})
export class CashOutDetailsComponent implements OnInit {

  transactionId: string;
  promotion: any;
  nameOperation: any;
  packageSelect: any = { 

  }
  realCoinsBanned: any
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location) {
      this.transactionId = this.route.snapshot.paramMap.get("txId")!
      this.promotion = this.route.snapshot.paramMap.get("promotion");
      this.route.queryParamMap.pipe(
        map((params: ParamMap) => {
          console.log(params)
        })
      )
    }

  ngOnInit(): void {
      console.log('this.promotion => ', this.promotion)
      const promoCode = localStorage.getItem("promoCode");
      const packageId = Number(localStorage.getItem("packagepurchaseId")) 
      if (promoCode != null) {
        const previewPromo = JSON.parse(localStorage.getItem('previewPromo')!);
        const packageSelect = previewPromo.packageCatalog;
      }
  }

  ReturnBack(): void{
    this.location.back();
  }

  ReturnHome(){
    console.log("ReturnHome");
    //this.router.navigate(['/']);
  }

}
