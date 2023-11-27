import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentComponentComponent } from './components/payment/payment-component.component';
import { CashOutDetailsComponent } from './components/details/details.component';

const routes: Routes = [
  { path: 'payment', component: PaymentComponentComponent },
  { 
    path: 'details/:txId', 
    component: CashOutDetailsComponent 
  },
  { path: '', redirectTo: '/payment', pathMatch: 'full' } // Ruta por defecto
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
