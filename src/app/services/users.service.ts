import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServerResponse_UserList, User, UserFilterParams } from '../shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getUsers(filters: UserFilterParams, page: number) {
    const params: { [param: string]: string } = {}
    for (const field in filters) {
      if (Object.prototype.hasOwnProperty.call(filters, field)) {
        if (filters[field as keyof UserFilterParams]) {
          params[field] = filters[field as keyof UserFilterParams]!;
        }
      }
    }
    params.page = page.toString();
    return this.http.get<ServerResponse_UserList>('/users' + this.toGetParamsString(params));
  }

  addUser(user: User) {
    return this.http.post('/users/add/', user);
  }

  toGetParamsString(params: { [param: string]: string }) {
    let paramsString = '';
    let firstParam = true;
    for (const key in params) {
      if (Object.prototype.hasOwnProperty.call(params, key)) {
        paramsString += firstParam ? '?' : '&';
        paramsString += key + '=' + params[key];
        firstParam = false;
      }
    }
    return paramsString;
  }
}
