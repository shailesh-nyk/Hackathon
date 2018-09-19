import { Component,Input,OnInit } from '@angular/core';


@Component({
	selector: 'jt-spinner',
	templateUrl: './spinner.component.html',
    styleUrls  : [ './spinner.component.scss'],
})

export class SpinnerComponent {
	@Input() drawer?: boolean;
	public isDrawerComponent:boolean = false;
	public isDefault:boolean = true;
	constructor(
		) {}

	ngOnInit(){
		if(this.drawer){
			this.isDrawerComponent = true;
			this.isDefault = false;
		}
	}
}
