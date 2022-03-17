import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Amigo, Status_indicacao } from './amigo';
import { DropdownService } from 'src/app/shared/services/dropdown.service';
@Injectable({
  providedIn: 'root'
})
export class AmigoService {
  private apiURL = "http://localhost:8000/api/indicacao/";
  status_indicacao: Status_indicacao[] = [];

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient, public dropdownService: DropdownService) { }
  getAll(): Observable<Amigo[]> {
    return this.httpClient.get<Amigo[]>(this.apiURL)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  create(amigo: any): Observable<Amigo> {
    return this.httpClient.post<Amigo>(this.apiURL, JSON.stringify(amigo), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  find(id: string | number): Observable<Amigo> {
    return this.httpClient.get<Amigo>(this.apiURL + id)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  update(id: string | number, amigo: any): Observable<Amigo> {
    return this.httpClient.put<Amigo>(this.apiURL + id, JSON.stringify(amigo), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  delete(id: string | number) {
    return this.httpClient.delete<Amigo>(this.apiURL + id, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  errorHandler(errors: { error: { message: string; errors_form: any; }; status: any; }) {

    if (errors.status == 401) {
      let totErr = (Object.keys(errors.error.errors_form)).length;
      let i = 0;
      let shErr = '';
      for (var [key, value] of Object.entries(errors.error.errors_form)) {
        shErr += value + `\n`;
        i++;
        if (i == totErr)
          alert('Erro: ' + shErr);
      }
    } else if (errors.status == 500) {
      alert('Erro: de banco de dados');
    }

    let errorMessage = '';
    if (errors.error instanceof ErrorEvent) {
      errorMessage = errors.error.message;
    } else {
      errorMessage = `Error Code: ${errors.status}\nMessage: ${errors.error.message}`;
    }
    return throwError(errorMessage);
  }

  listStatus(id: any) {
    this.dropdownService.getStatus(id).subscribe((data: Status_indicacao[]): void => {
      this.status_indicacao = data;
      console.log(this.status_indicacao);
    });
  }
}
