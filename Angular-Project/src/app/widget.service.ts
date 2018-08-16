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

}
