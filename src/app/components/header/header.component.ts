import { Component,Input, ViewEncapsulation, OnInit,EventEmitter,Output,ViewChild } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { AppConfig } from '../../app-config';
@Component({
    selector: 'jt-app-header',
    templateUrl: './header.component.html',
    styleUrls  : [ './header.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class HeaderComponent {
    constructor(
        private appConfig: AppConfig
    ){ }
    
	ngOnInit() {
    }
    logout() {
        this.appConfig.ifLoggedIn = false;
    }
}
