import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { CoinPackageRoutingModule } from './payment-component-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialogModule } from '@angular/material/dialog';
import { InputMaskModule } from '@ngneat/input-mask';
import { CashOutDetailsComponent } from './cash-out/cash-out-details.component';

@NgModule({
  declarations: [
    CashOutDetailsComponent,
  ],
  imports: [
      FormsModule,
      ReactiveFormsModule,
      MatMenuModule,
      MatAutocompleteModule,
      CommonModule,
      CoinPackageRoutingModule,
      RouterModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      MatRadioModule,
      MatIconModule,
      MatDialogModule,
      MatSnackBarModule,
      InputMaskModule
  ]
})
export class CoinPackageModule { }
