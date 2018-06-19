import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { urlResponseObject } from '../model/url_response_object_model';
import { urlRequest } from '../model/url_request_model';
import { Observable } from 'rxjs';

@Injectable()
export class Server {
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

    urlData: any
    constructor(
        private http: HttpClient
    ) { }

    getRecent(page: number): Observable<urlResponseObject> {
        return this.http.get<urlResponseObject>(`http://localhost:5000/recent/` + page);
    }

    getTotalRecords(): Observable<string> {
        return this.http.get<string>(`http://localhost:5000/totalRecords`);
    }

    postUrl(convertUrl: urlRequest): Observable<urlRequest> {
        let body = new FormData();
        body.append('url', convertUrl.url);
        return this.http.post<urlRequest>(`http://localhost:5000/`, body);
    }

}
