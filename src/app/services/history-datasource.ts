import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import { History } from './medical-history';
import { Observable} from 'rxjs';
import { PatientService } from './patient.service';
import { finalize, catchError } from "rxjs/operators";
import { of } from "rxjs/observable/of";

export class HistoryDataSource implements DataSource<any> {

    private historySubject = new BehaviorSubject<any>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    public historyLoading$ = this.loadingSubject.asObservable();
    constructor(private patientservice: PatientService) {}

    connect(collectionViewer: CollectionViewer): Observable<any> {
        return this.historySubject.asObservable();
    }
    disconnect(collectionViewer: CollectionViewer): void {
        this.historySubject.complete();
        this.loadingSubject.complete();
    }
    public loadHistory(id , pageIndex, pageSize) {
        this.loadingSubject.next(true);
        this.patientservice.getPatientHistory(id, pageIndex, pageSize).pipe(
            catchError(() => of([])),
            finalize(() => this.loadingSubject.next(false))
        )
        .subscribe(resp => {
            this.loadingSubject.next(false);
            this.historySubject.next(resp)
        });
    }  
}