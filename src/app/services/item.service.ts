import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Item } from '../models/item';
import { Pick } from '../models/Pick';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  httpHeaders = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
  baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }
  
  getItem(id: number): Observable<any> {
    return this.http.get(this.baseUrl + 'Items/' + id + '/', this.getAuthHeaders());
  }

  getItems(): Observable<any> {
    return this.http.get(this.baseUrl + 'Items/', this.getAuthHeaders());
  }

  addItem(item): Observable<any> {
    return this.http.post(this.baseUrl + 'Items/', item, this.getAuthHeaders());
  }

  getPickz(): Observable<any> {
    return this.http.get(this.baseUrl + 'Picks/' , this.getAuthHeaders());
  }

  randomize(): Observable<any> {
    return this.http.get(this.baseUrl + 'Randomize/' , this.getAuthHeaders());
  }


  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    const httpHeaders = new HttpHeaders(
      {'Content-Type': 'application/json; charset=utf-8',
      'Authorization': 'Token ' + token});
    return { headers: httpHeaders};
  }
}
