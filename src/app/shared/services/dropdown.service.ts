import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Status_indicacao } from 'src/app/amigo/amigo';
@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  constructor(private httpClient: HttpClient) { }
  //private apiURLestados = "assets/dados/estadosbr.json";
  private apiURstatus = "http://localhost:8000/api/indicacao/listStatus/";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }
  getStatus(id: any): Observable<Status_indicacao[]> {
    return this.httpClient.get<Status_indicacao[]>(this.apiURstatus + id).pipe(
      catchError(this.errorHandler)
    );
  }

  errorHandler(error: { error: { message: string; }; status: any; message: any; }) {
    console.log(error)
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    alert(errorMessage + ', VERIFICAR SE O SERVIDOR ESTA RODANDO');
    return throwError(errorMessage);
  }
}
