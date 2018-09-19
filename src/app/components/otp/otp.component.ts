import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl, FormsModule } from '@angular/forms';

@Component({
  selector: 'jt-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss']
})
export class OTPComponent implements OnInit {
   spinner: boolean = false;
   user_otp: string;
   db_otp: string;
   otperr: boolean = false;
   constructor(
    public dialogRef: MatDialogRef<OTPComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
     ) { }
    ngOnInit() {
        this.db_otp = this.data.otp;
    }
    validateOTP() {
       this.otperr = false;
       if(this.user_otp === this.db_otp) {
           this.dialogRef.close(true);
       }
       else {
          this.otperr = true;
       }
    }
    clearErr() {
      this.otperr = false;
   }
}
