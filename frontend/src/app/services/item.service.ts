import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from '../models/item.model';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private apiUrl = 'http://localhost:3000/api/items';

  constructor(private http: HttpClient) {}

  // CRUD operations
  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.apiUrl);
  }

  getItem(id: string): Observable<Item> {
    return this.http.get<Item>(`${this.apiUrl}/${id}`);
  }

  addItem(item: Item): Observable<Item> {
    return this.http.post<Item>(this.apiUrl, item);
  }

  updateItem(id: string, item: Item): Observable<Item> {
    return this.http.put<Item>(`${this.apiUrl}/${id}`, item);
  }

  deleteItem(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Workday API integration
  private workdayApiUrl = 'https://api.workday.com/v1';

  private getWorkdayHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': 'Bearer ' + this.getAccessToken(),
      'Content-Type': 'application/json'
    });
  }

  private getAccessToken(): string {
    // Implement OAuth 2.0 authentication to get the access token
    return 'your-access-token';
  }

  synchronizeWithWorkday(item: Item): Observable<any> {
    const url = `${this.workdayApiUrl}/items`;
    const headers = this.getWorkdayHeaders();
    return this.http.post(url, item, { headers });
  }

  fetchWorkdayData(): Observable<any> {
    const url = `${this.workdayApiUrl}/items`;
    const headers = this.getWorkdayHeaders();
    return this.http.get(url, { headers });
  }
}
