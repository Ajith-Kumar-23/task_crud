import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://crudcrud.com/api/c0ae457c269947ae88bdf514bf089b2e/users';

  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get(this.apiUrl);
  }

  createUser(user: any) {
    return this.http.post(this.apiUrl, user);
  }

  updateUser(id: string, updatedUser: any) {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put(url, updatedUser);
  }

  deleteUser(id: string) {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
}
