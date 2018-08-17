import { Component } from '@angular/core';
import { WidgetService } from './widget.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    widgets: any;
    widget: any;
    widgetDetails: any;

    constructor(private _widgetService: WidgetService) {
        this.widgets = [];
        this.widget = { title: '', description: '', qty: 0, price: 0 };
        this.widgetDetails = { title: '', description: '', qty: 0, price: 0 };
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

    createWidget() {
        const tempObservable = this._widgetService.createWidget(this.widget);
        tempObservable.subscribe(
            (response) => {
                console.log(response);
                this.getWidgets();
            },
            (error) => {
                console.log(error);
            }
        );
    }

    getWidget(id) {
        console.log("@@@@ 1");
        const tempObservable = this._widgetService.getWidget(id);
        tempObservable.subscribe(
            (success) => {
                console.log("@@@@ 5 response:", success);
                this.widgetDetails = success;
            },
            (error) => {

            }
        );
    }

    deleteWidget(id) {
        console.log("deleteWidget, id: ", id);
        const tempObservable = this._widgetService.deleteWidget(id);
        tempObservable.subscribe(
            (success) => {
                this.getWidgets();
            },
            (error) => {

            }
        );

    }

    updateWidget() {
        const tempObservable = this._widgetService.updateWidget(this.widgetDetails);
        tempObservable.subscribe(
            (success) => {
                this.getWidgets();
            },
            (error) => {

            }
        );
    }

}
