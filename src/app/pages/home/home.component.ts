import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { SpinnerComponent } from '../../components/spinner/spinner.component';
import { FormBuilder, FormGroup, Validators, FormControl, PatternValidator} from '@angular/forms';
import { PatientService } from '../../services/patient.service'
import {MatDialog, MatPaginator, MatTableDataSource, PageEvent } from '@angular/material';
import { MedicalHistoryComponent } from '../../components/medical-history/medical-history.component';
import { HistoryDataSource } from '../../services/history-datasource';
import { tap } from 'rxjs/operators';
import { trigger, style, animate, transition } from '@angular/animations';
import * as JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { OTPComponent } from '../../components/otp/otp.component';

@Component({
  selector: 'jt-home-pg',
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({transform: 'translateX(100%)', opacity: 0}),
          animate('300ms', style({ opacity: 1}))
        ])
      ]
    )
  ],
	templateUrl: './home.component.html',
    styleUrls: [ './home.component.scss'],
})

export class HomeComponent implements OnInit{
  displayedColumns = ['date', 'treatedby', 'treatedat', 'diagnosis', 'more'];
  dataSource: HistoryDataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchID: string = '';
  isSearchComplete: boolean = false;
  isMedHistComplete: boolean = false;
  spinner = false;
  public frmSearch: FormGroup;
  public frmPrescription: FormGroup;
  patientDetails : any;
  medHistTooltip = "This section displays the medical history of the patient in a chronological order. You can expand every row to get a detailed information about each record."
  enteredSymptom : string;
  symptomListDL = [];
  symptomListPresc = [];
  prescList = [];
  noHistRecords: number = 0;
  pageEvent: PageEvent;
  isSubmitted: boolean = false;
  currentDate: Date;
  prescription: any;
  otperr: boolean = false;
  predictions = [];

  constructor(
    private formBuilder: FormBuilder,
    private patientService: PatientService,
    public dialog: MatDialog
  ) { }
  ngOnInit() {
    this.frmSearch = this.formBuilder.group({
      search: ['', Validators.compose([Validators.required])]
    });
    this.frmPrescription = this.formBuilder.group({
      id: ['', Validators.compose([Validators.required])],
      symptom: [''],
      diagnosis: [''],
      prescription: ['']
    });
    this.dataSource = new HistoryDataSource(this.patientService);
  }
  loadHistoryPage() {
    this.dataSource.loadHistory(this.searchID, this.paginator.pageIndex + 1 , this.paginator.pageSize);
  }
  sendOTP() {
    this.isSearchComplete = false;
    this.otperr = false;
    this.searchID = this.frmSearch.controls.search.value.trim();
    this.patientService.getMobileNumber(this.searchID)
    .subscribe(
        data => {
           this.spinner = false;  
           if(data.contact_number !== undefined) {
              this.generateOTP(data.contact_number);
            }
            else {
              this.otperr = true;
            }
        }
    )
  }
	getPatientDetails() {
      this.spinner = true;
      this.patientService.getPatientDetails(this.searchID)
        .subscribe(
            data => {
               if(data.id !== undefined) {
                  this.patientDetails = data;
                  this.noHistRecords = data.records;
                }
                else {
                  this.patientDetails = null;
                 }
                 this.afterSearch();
            }
        )
  }
  generateOTP(num) {
    this.otperr = false;
    this.spinner = true;
    this.patientService.generateOTP(num)
    .subscribe(
      resp => {
        this.spinner = false;
        if(resp.status == 'success') {
           this.getOTP(resp.data);
        }
        else {
           this.otperr = true;
        }
      }
    )
  }
  afterSearch() {
      this.spinner = false;
      this.isSearchComplete = true;
      this.frmPrescription.controls.id.patchValue(this.searchID);
      this.frmPrescription.controls.id.disable();
      this.dataSource.loadHistory(this.searchID , 1 , 5);
      setTimeout(() => {
        this.paginator.page
        .pipe(
            tap(() => this.loadHistoryPage())
        )
        .subscribe();
      },1000);
  }

  editDate(date: string): string {
      let year = date.slice(0,4);
      let month = date.slice(5,7);
      let day = date.slice(8,10);
      return day + '-' + month + '-' + year;
  }
  expandHistory(rowData: any) {
    let dialogRef = this.dialog.open( MedicalHistoryComponent, {
			data: {
        'details': rowData ,
        'patient': this.patientDetails
      },
			disableClose: true
		});
		dialogRef.afterClosed().subscribe(result => {
    });
  }
  getOTP(otp: any) {
    let dialogRef = this.dialog.open( OTPComponent, {
			data: {
        'otp': otp
      },
			disableClose: true
		});
		dialogRef.afterClosed().subscribe(result => {
        if(result == true) {
            this.getPatientDetails();
        }
    });
  }
  addSymptomsDL() {
      if(this.enteredSymptom.trim() !== '') {
         this.symptomListDL.push(this.enteredSymptom.trim());
      }
  }
  addPrescSymptom() {
    let symp = this.frmPrescription.controls.symptom.value.trim();
    if(symp !== '') {
      this.symptomListPresc.push(symp);
    }
  }
  removeSymptomItem(i: any) {
      this.symptomListDL.splice(i,1);
  }
  removeSymptomItemPresc(i: any) {
    this.symptomListPresc.splice(i,1);
  }
  addPrescItem() {
    let pres = this.frmPrescription.controls.prescription.value.trim();
    if(pres !== '') {
      this.prescList.push(pres);
    }
  }
  removePrescItem(i: any) {
      this.prescList.splice(i,1);
  }
  submitPrescription() {
      this.spinner = true;
      let body = {
        "patientId": this.searchID,
        "age": this.patientDetails.age,
        "symptoms": this.symptomListPresc.toString(),
        "diagnosis": this.frmPrescription.controls.diagnosis.value.trim(),
        "prescriptions": this.prescList.toString(),
        "treatedAt": "Jaipur Hackathon",
        "treatedBy":  "Dr. Sharma"
      }
      this.patientService.createHistory(body)
       .subscribe(
           data => {
             this.spinner = false;
              if(data === 'success') {
                alert('Prescription submitted successfully');
                //redirect to home tab
              }
              else {
                alert('Failed to submit prescription!!');
              }
           }
       )

  }
  switchPage(){
        let zip: JSZip = new JSZip();
        console.log(zip);
        zip.files('G:/DOC_SCAN/aadhar1.pdf');
        zip.generateAsync({type:"blob"})
        .then(function(content) {
            saveAs(content, "example.zip");
        });
        // this.prescription = {
        //   'date': new Date(),
        //   'id': this.patientDetails.id == undefined ? '' : this.patientDetails.id ,
        //   'name': this.patientDetails.name == undefined ? '' : this.patientDetails.name ,
        //   'age': this.patientDetails.age == undefined ? '' : this.patientDetails.age ,
        //   'sex': this.patientDetails.sex == undefined ? '' : this.patientDetails.sex
      //  }
      //  this.isSubmitted = true;
  }
  clearErr() {
     this.otperr = false;
  }
  getPredictions() {
     this.predictions = [];
     this.patientService.getPrediction(this.symptomListDL.toString())
      .subscribe (
         data => {
            this.predictions = data['predictions'];
         }
      )
  }
}

