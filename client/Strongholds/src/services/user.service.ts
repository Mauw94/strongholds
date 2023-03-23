import { HttpClient } from '@angular/common/http'
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {

    private serverUrl: string = 'http://localhost:7000/api/'

    constructor(private http: HttpClient) { }

    getUsers(): Observable<any> {
        return this.http.get(this.serverUrl + 'users')
    }
}