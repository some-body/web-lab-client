import { Router, NavigationEnd } from "@angular/router";

export abstract class OnNavigationEnd {
    constructor(router: Router) {
        let subscription = router.events.subscribe((val) => {
            if(val instanceof NavigationEnd) {
                subscription.unsubscribe();
                this.onNavigationEnd();
            }
        });
    }

    protected abstract onNavigationEnd();
}