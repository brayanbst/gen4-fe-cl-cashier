import { Component, OnInit, Input } from '@angular/core';
import { createMask } from '@ngneat/input-mask';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Subject, BehaviorSubject, Observable, of, map, switchMap } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { fields } from './fields';
import { Validators } from "@angular/forms"
import { HttpCashierService } from './../../shared/services/http.service';

@Component({
  selector: 'app-payment-component',
  templateUrl: './payment-component.component.html',
  styleUrls: ['./payment-component.component.scss']
})
export class PaymentComponentComponent implements OnInit{
    selected: boolean = false;
    selectorEmpty$ = new BehaviorSubject<Boolean>(false);
    fields = fields;
    cardSelected: boolean = false;
    form!: FormGroup;
    cvvValue: string = '';
    packageSelect: any = {
      pricing: 10,
      finalFunCoins: 100,
    }
    submit = new Subject<boolean>();
    rememberCard = false;
    creditCard = '';
    selecteIcon: string = '';
    cardInputMask = createMask<string>({
      alias: 'datetime',
      inputFormat: 'mm/yy',
      parser: (value: string) => {
        console.log('gdfgdfg', value)
        return value
      }
    })
  
    constructor(
      private route: ActivatedRoute,
      private location: Location,
      private fb: FormBuilder,
      private httpCashierService: HttpCashierService,
      private router: Router,
  
      ) {
      }
  
      ngOnInit(): void {
        this.form = this.fb.group({
          cardNumber: ['', Validators.required],
          expireDate: ['', Validators.required],
          cvv: ['', Validators.required]
        });
        const mockCardData = [
          { last4: '1234', cardId: '1', crc: '001', paymentNetwork: 'visa' },
          { last4: '5678', cardId: '2', crc: '002', paymentNetwork: 'mastercard' },
          { last4: '9012', cardId: '3', crc: '003', paymentNetwork: 'amex' },
          { last4: '3456', cardId: '4', crc: '004', paymentNetwork: 'discover' },
        ];

        this.fields[0].options = mockCardData.map(card => {
          const data = {
            value: `   ************${card.last4}`,
          label: `   ************${card.last4}`,
          cardId: card.cardId,
          crc: card.crc,
          paymentNetwork: card.paymentNetwork,
          bankIcon: ''
          }
          const bankIcons: any = {
            'visa': 'fa-brands fa-cc-visa',
            'mastercard': 'fa-brands fa-cc-mastercard',
            'amex': 'fa-brands fa-cc-amex',
            'discover': 'fa-brands fa-cc-discover',
          };
          data.bankIcon = bankIcons[data.paymentNetwork] || '';
          return data;
        });
      }
  
    ReturnBack(): void{
      this.location.back();
    }
  
    requirePersonalService(): void{
      console.log("requirePersonalService");
    }
  
    ProccessPayment(): void {
      const cardNumber = this.form.get('cardNumber')?.value;
      const expireDate = this.form.get('expireDate')?.value;
      let partes = expireDate.split('/');
      let expirationMonth = partes[0];
      let expirationYear = partes[1];
      const cvv = this.cvvValue;
      const payload = {
        "commerceId": 1,
        "transactionType": "CREDITO",
        "amount": this.packageSelect.pricing,
        "processor": "checkout",
        "processorType": "cc",
        "email": "usuario@example.com",
        "description": "Laptop Decima Gen",
        "currencyType": "PEN",
        "card": {
                    "cardNumber": cardNumber,
                    "cvv": cvv,
                    "expirationMonth": expirationMonth,
                    "expirationYear": `20${expirationYear}`,
                    "email": "usuario@example.com"
                }
    }
    
      this.httpCashierService.payoutEstablishData(payload).pipe()
      .subscribe({
        next: (res: any) => {
          console.log('TEST', res);
          this.router.navigate(['/details', 1010]);
        },
      });

      const last4Digits = cardNumber.slice(-4);
      const paymentNetwork = this.identifyCardNetwork(cardNumber);
    
      const newCardData = {
        last4: last4Digits,
        cardId: 'newCard', 
        crc: 'newCrc', 
        paymentNetwork: paymentNetwork
      };
    
      let savedCards = JSON.parse(localStorage.getItem('savedCards') || '[]');
      savedCards.push(newCardData);
      localStorage.setItem('savedCards', JSON.stringify(savedCards));
    
      this.fields[0].options = savedCards.map((card:any) => this.createCardOption(card));
    }
    
  
    log(param: any) {
      console.log("res=", param)
    }
    get hasCard() {
      return false;
    }
  
    onSelectionChange(event: any) {
      this.selected = true;
      const input = event.option.value;
      const { bankIcons, informationCard } = this.getSelectBank();
      this.selectorEmpty$.next(event.option._selected);
      
      if (input === '' && !this.selectorEmpty$.getValue()) {
        this.cardSelected = true;
        this.selecteIcon = '';
      } else if (input !== '' && this.selectorEmpty$.getValue()){
        this.cardSelected = false;
        this.selecteIcon = bankIcons[informationCard.paymentNetwork] || '';
      } 
      if (input == informationCard.value) {
        this.cardSelected  = false;
      }
    }
  
    onDelete(option: any) {
      option.selected = false;
      this.selected = false;
    }
  
    onInput(event: any) {
      const input = event.target.value;
      const { bankIcons, informationCard } = this.getSelectBank();
      const firstDigit = Number(String(input)[0]);
      const cardTypeMap: any = {
        4: 'fa-brands fa-cc-visa',
        5: 'fa-brands fa-cc-mastercard',
        3: 'fa-brands fa-cc-amex',
        6: 'fa-brands fa-cc-discover',
      };
      this.selecteIcon = cardTypeMap[firstDigit];
      if (input === '') {
        this.cardSelected = true;
        this.selecteIcon = ''
      }
       if (input !== '' && this.selectorEmpty$.getValue()) {
        this.selecteIcon = bankIcons[informationCard.paymentNetwork] || '';
        this.cardSelected  = true;
      } else if (input == '' && this.selectorEmpty$.getValue()){
        this.cardSelected  = false;
        this.selecteIcon = ''
      } 
      if (input == informationCard.value) {
        this.cardSelected  = false;
      }
    }
  
    getSelectBank () {
      const informationCard = { ...this.fields[0].options?.find(i => i.value === this.form.value.cardNumber), cvv: this.cvvValue };
      const bankIcons: any = {
        'visa': 'fa-brands fa-cc-visa',
        'mastercard': 'fa-brands fa-cc-mastercard',
        'amex': 'fa-brands fa-cc-amex',
        'discover': 'fa-brands fa-cc-discover',
      };
      return { informationCard, bankIcons };
    }

    identifyCardNetwork(cardNumber: string): string {
      if (cardNumber.startsWith('4')) {
        return 'visa';
      } else if (cardNumber.startsWith('5')) {
        return 'mastercard';
      }
      return 'unknown';
    }

    createCardOption(cardData: any) {
      const bankIcons: any = {
        'visa': 'fa-brands fa-cc-visa',
        'mastercard': 'fa-brands fa-cc-mastercard',
        'amex': 'fa-brands fa-cc-amex',
        'discover': 'fa-brands fa-cc-discover',
      };
      return {
        value: `   ************${cardData.last4}`,
        label: `   ************${cardData.last4}`,
        cardId: cardData.cardId,
        crc: cardData.crc,
        paymentNetwork: cardData.paymentNetwork,
        bankIcon: bankIcons[cardData.paymentNetwork] || ''
      };
    }

}
