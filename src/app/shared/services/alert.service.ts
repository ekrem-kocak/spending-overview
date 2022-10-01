import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private _snackBar: MatSnackBar) { }

  error(message: string) {
    this._snackBar.open(message, '', {
      duration: 3000,
      verticalPosition: 'top',
      panelClass:['mat-toolbar', 'mat-primary'],
    });
  }
}
