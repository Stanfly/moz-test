import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { ServerResponse_UserList, User, UserFilterParams } from '../shared/interfaces';


@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const { url, method, body } = request;
    const maxresults = 3;
    return of(null)
      .pipe(mergeMap(handleRoute))
      .pipe(materialize())
      .pipe(delay(500))
      .pipe(dematerialize());

    function handleRoute() {
      switch (true) {
        case url.match(/\/users.*/) && method === 'GET':
          return getUsers();
        case url.match(/\/user\/\d+$/) && method === 'DELETE':
          return deleteUser();
        case url.match(/\/users\/add\//) && method === 'POST':
          return addUser();
        default:
          return next.handle(request);
      }
    }


    function getUsers() {
      const params = getParams<UserFilterParams & { page: string }>();
      const page = params.page ? +params.page : 1;
      let filteredUsers = usersList;
      let pagesCount = 0;
      filteredUsers = filteredUsers
        .filter(user => params.id ? user.id === +params.id : true)
        .filter(user => params.fio ? user.fio.toLowerCase().indexOf(params.fio.toLowerCase()) !== -1 : true)
        .filter(user => params.position ? user.position.toLowerCase().startsWith(params.position.toLowerCase()) : true)
        .filter(user => params.login ? user.login.toLowerCase().startsWith(params.login.toLowerCase()) : true);
      pagesCount = Math.ceil(filteredUsers.length / maxresults);
      filteredUsers = filteredUsers.slice((page - 1) * maxresults, (page) * maxresults)
      let result: ServerResponse_UserList = { users: filteredUsers, currenPage: page, pagesCount }
      return ok(result);
    }

    function deleteUser() {
      usersList = usersList.filter((x: any) => x.id !== idFromUrl());
      return ok();
    }

    function addUser() {
      body.id = usersList[usersList.length - 1].id + 1;
      usersList.push(body);
      return ok();
    }



    function ok(body?: any) {
      return of(new HttpResponse({ status: 200, body }))
    }

    function idFromUrl() {
      const urlParts = url.split('/');
      return parseInt(urlParts[urlParts.length - 1]);
    }

    function getParams<T>() {
      let match,
        pl = /\+/g,
        search = /([^&=]+)=?([^&]*)/g,
        decode = function (s: any) { return decodeURIComponent(s.replace(pl, " ")); },
        query = url.split('?')[1];

      const urlParams: any = {};
      while (match = search.exec(query)) {
        urlParams[decode(match[1])] = decode(match[2]);
      }
      return urlParams as T;
    }
  }
}

export const fakeBackendInterceptor = {
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true
};

let usersList: User[] = [
  { id: 1, registeredAt: Date.now(), login: '1example@mail.x', pass: '*********', phone: '+7 951 xxx xx xx', fio: 'Иванов Иван Иванович', position: 'Внешний эксперт' },
  { id: 2, registeredAt: Date.now(), login: '2example@mail.x', pass: '*********', phone: '+7 951 xxx xx xx', fio: 'Сидоров Сидор Сидорович', position: 'HR BP' },
  { id: 3, registeredAt: Date.now(), login: '3example@mail.x', pass: '*********', phone: '+7 957 xxx xx xx', fio: 'Петров Пётр Петрович', position: 'HR BP' },
  { id: 4, registeredAt: Date.now(), login: '4example@mail.x', pass: '*********', phone: '+7 951 xxx xx xx', fio: 'Денис', position: 'HR BP' },
  { id: 5, registeredAt: Date.now(), login: '5example@mail.x', pass: '*********', phone: '+7 916 xxx xx xx', fio: 'Майкл Джексон', position: 'Внешний эксперт' },
  { id: 6, registeredAt: Date.now(), login: '6example@mail.x', pass: '*********', phone: '+7 998 xxx xx xx', fio: 'Стив Джобс', position: 'Внешний эксперт' },
  { id: 7, registeredAt: Date.now(), login: '7example@mail.x', pass: '*********', phone: '+7 951 xxx xx xx', fio: 'Цой', position: 'Музыкант' },
  { id: 8, registeredAt: Date.now(), login: '8example@mail.x', pass: '*********', phone: '+7 951 xxx xx xx', fio: 'Александр II', position: 'Император Всероссийский' },
  { id: 9, registeredAt: Date.now(), login: '9example@mail.x', pass: '*********', phone: '+7 138 xxx xx xx', fio: 'Иоанн Грозный', position: 'Великий князь Московский и всея Руси' },
]