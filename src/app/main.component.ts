import { Component, ViewEncapsulation, Input, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, PatternValidator} from '@angular/forms';

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { AppConfig } from './app-config';
@Component({
    selector: 'main-comp',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class MainComponent {
    public spinner: boolean = false;
    public frmLogin: FormGroup;
    
    constructor(
        private appConfig: AppConfig,
        private router: Router,
        private formBuilder: FormBuilder
    ) {
        // This block is to retrieve the data from the routes
        router.events
            .filter(event => event instanceof NavigationEnd)
            .map(_ => this.router.routerState.root)
            .map(route => {
                while (route.firstChild) route = route.firstChild;
                return route;
            })
            .flatMap(route => route.data)
            .subscribe(data => {
            });
    }

    ngOnInit() {
        this.frmLogin = this.formBuilder.group({
            username: ['', Validators.compose([Validators.required])],
            password: ['', Validators.compose([Validators.required])],
        });
    }
    login() {
        let user = this.frmLogin.controls.username.value.trim();
        let pass = this.frmLogin.controls.password.value;
        this.appConfig.users.forEach((item) => {
            if(user === item && pass === this.appConfig.password) {
                this.appConfig.loggedinuser = item;
                this.appConfig.ifLoggedIn = true;
                this.frmLogin.reset();
            }
        });
    }
}
