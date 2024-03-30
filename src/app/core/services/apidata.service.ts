import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApidataService {


  BaseUrl: string = 'https://reqres.in/api/users';

  constructor(
    private _HttpClient: HttpClient
    ) {}


  getUserDetails(userID: string): Observable<any> {
    return this._HttpClient.get(`${this.BaseUrl}/${userID}`);
  }

  getUsersByPage(numberOfPage: number): Observable<any> {
    return this._HttpClient.get(`${this.BaseUrl}?page=${numberOfPage}`);
  }

  getAllUsers(usersTotal: number): Observable<any> {
    return this._HttpClient.get(`${this.BaseUrl}?page=1&per_page=${usersTotal}`);
  }
}
