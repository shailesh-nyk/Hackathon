import { Component, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`
})
export class AppComponent {
  constructor(
    private router: Router
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
}