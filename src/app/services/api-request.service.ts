import { Injectable, Inject } from '@angular/core';
import { Http, Headers, Response, Request, RequestOptions, URLSearchParams, RequestMethod } from '@angular/http';
import { Router } from '@angular/router';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { AppConfig } from '../app-config';

@Injectable()
export class ApiRequestService {

    private headers: Headers;
    private requestOptions: RequestOptions;

    constructor(
        private appConfig: AppConfig,
        private http: Http,
        private router: Router,
    ) { }

    /**
     * This is a Global place to add all the request headers for every REST calls
     *
     */
    appendAuthHeader(extraHeaders?: object): Headers {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        if (extraHeaders) {
            for (var key in extraHeaders) {
                if (extraHeaders.hasOwnProperty(key)) {
                    headers.append(key, extraHeaders[key]);
                }
            }
        }
        return headers;
    }

    getRequestOptions(requestMethod, url: string, urlParam?: URLSearchParams, bodyParam?: object | string, extraHeader?: object): RequestOptions {
        let requestHeaders;
        if (extraHeader)
            requestHeaders = this.appendAuthHeader(extraHeader);
        else
            requestHeaders = this.appendAuthHeader();
        let options = new RequestOptions({
            headers: requestHeaders,
            method: requestMethod,
            url: this.appConfig.baseApiPath + url
        });
        console.log(options);
        alert('reached here')
        if (urlParam) {
            options = options.merge({ params: urlParam });
        }
        if (bodyParam) {
            if (typeof bodyParam === "string") {
                options = options.merge({ body: bodyParam });
            }
            else {
                options = options.merge({ body: JSON.stringify(bodyParam) });
            }
        }
        return options;
    }

    get(url: string, urlParams?: URLSearchParams): Observable<any> {
        let me = this;
        let requestOptions = this.getRequestOptions(RequestMethod.Get, url, urlParams);
        console.log(requestOptions);
        console.log("In GET");
        return this.http.request(new Request(requestOptions))
            .map(resp => resp.json())
            .catch(function (error: any) {
                if (error.status === 401) {
                    // me.router.navigate(["login"], { queryParams: { ENFORCELOGIN: 'YES', REDIRECTPAGE: me.getRedirectURL() } });
                }
                return Observable.throw( error || 'Server error')
            });
    }

    post(url: string, body: Object, extraHeader?: Object): Observable<any> {
        let me = this;
        let requestOptions = this.getRequestOptions(RequestMethod.Post, url, undefined, body, extraHeader);
        console.log("In POST");
        return this.http.request(new Request(requestOptions))
            .map(resp => resp.json())
            .catch(function (error: any) {
                if (error.status === 401) {
                    // me.router.navigate(["login"], { queryParams: { ENFORCELOGIN: 'YES', REDIRECTPAGE: me.getRedirectURL() } });
                }
                return Observable.throw(error || 'Server error')
            });
    }

    put(url: string, body: Object): Observable<any> {
        let me = this;
        let requestOptions = this.getRequestOptions(RequestMethod.Put, url, undefined, body);
        return this.http.request(new Request(requestOptions))
            .map(resp => resp.json())
            .catch(function (error: any) {
                if (error.status === 401) {
                    // me.router.navigate(["login"], { queryParams: { ENFORCELOGIN: 'YES', REDIRECTPAGE: me.getRedirectURL() } });
                }
                return Observable.throw(error || 'Server error')
            });
    }

    delete(url: string, body?: Object): Observable<any> {
        let me = this;
        let requestOptions = this.getRequestOptions(RequestMethod.Delete, url, undefined, body);
        return this.http.request(new Request(requestOptions))
            .map(resp => resp.json())
            .catch(function (error: any) {
                if (error.status === 401) {
                    // me.router.navigate(["login"], { queryParams: { ENFORCELOGIN: 'YES', REDIRECTPAGE: me.getRedirectURL() } });
                }
                return Observable.throw(error || 'Server error')
            });
    }
}
