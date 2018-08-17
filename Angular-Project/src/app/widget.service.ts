import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class WidgetService {

    constructor(private _http: HttpClient) { }

    getWidgets() {
        return this._http.get('/widgets');
    }

    createWidget(widget) {
        return this._http.post('/widgets', widget);
    }

    getWidget(id) {
        console.log("@@@@ 2");
        return this._http.get('/widgets/' + id);
    }

    deleteWidget(id) {
        return this._http.delete('/widgets/' + id);
    //  return this._http.delete('/widgets/935h93);
    }

    updateWidget(widgetDetails) {
        return this._http.put('/widgets/' + widgetDetails._id, widgetDetails);
    }

}
