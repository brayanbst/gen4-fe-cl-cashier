import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CashOutDetailsComponent } from './cash-out/cash-out-details.component';
import { PaymentComponentComponent } from './payment/payment-component.component';

const routes: Routes = [
  {
    path: '',
    component: PaymentComponentComponent,
  },
  {
    path: 'details/:txId',
    component: CashOutDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoinPackageRoutingModule {}
