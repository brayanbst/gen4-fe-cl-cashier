import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from "@angular/core"
import { MatSnackBar } from "@angular/material/snack-bar";
import { Observable, of } from "rxjs";
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class HttpCashierService {
  Trustly: any;
  constructor(private http: HttpClient,
              private _snackBar: MatSnackBar,
              private router: Router) {
  }

  payoutEstablishData(payload: any) {
    const URL = 'http://localhost:3000/transactions';
    return this.http.post(URL, payload).pipe(map((res) => res));
  }
}
