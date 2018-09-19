import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl, FormsModule } from '@angular/forms';

@Component({
  selector: 'jt-medical-history',
  templateUrl: './medical-history.component.html',
  styleUrls: ['./medical-history.component.scss']
})
export class MedicalHistoryComponent implements OnInit {
   spinner: boolean = false;
   patient: any;
   details: any;
   constructor(
    public dialogRef: MatDialogRef<MedicalHistoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
     ) { }
    ngOnInit() {
      this.patient = this.data.patient;
      this.details = this.data.details;
      console.log(this.data);
    }
}
