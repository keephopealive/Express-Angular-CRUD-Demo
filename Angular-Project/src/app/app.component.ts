import { Component } from '@angular/core';
import { WidgetService } from './widget.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    widgets: any;

    constructor(private _widgetService: WidgetService) {
        this.widgets = [];
        this.getWidgets();
    }

    getWidgets() {
        const tempObservable = this._widgetService.getWidgets();
        tempObservable.subscribe(
            (widgets) => {
                console.log('Success: ', widgets)
                this.widgets = widgets;
            },
            (err) => {
                console.log('Error: ', err);
            }
        );
    }

}
