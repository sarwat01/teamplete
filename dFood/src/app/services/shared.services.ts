import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Employee } from './employee';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr'; 
import {environment} from '../../environments/environment'



const baseURL = 'http://localhost:3000/v1/users';


@Injectable({
  providedIn: 'root'
})

export class RestApiService {

 constructor(private http: HttpClient,private tostService:ToastrService) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }



  // HttpClient API get() method => Fetch  list
  get(path:any): Observable<Employee> {
    return this.http.get<Employee>(path)
    .pipe( retry(0), catchError(this.handleError)
    )
  }
  // HttpClient API get() method => Fetch id
  getbyid(path,id): Observable<Employee> {
    return this.http.get<Employee>(path+id)
    .pipe( retry(0),
      catchError(this.handleError)
    )
  }
  // HttpClient API post() method => send
  post(link,employee): Observable<Employee> {
    return this.http.post<Employee>(link, JSON.stringify(employee), this.httpOptions)
    .pipe(
      retry(0),
      catchError(this.handleError)
    )
  }
  // HttpClient API put() method => Update
  put(link,id, employee): Observable<Employee> {
    return this.http.put<Employee>(link+id, JSON.stringify(employee), this.httpOptions)
    .pipe(
      retry(0),
      catchError(this.handleError)
    )
  }
  patch(link,id, employee): Observable<Employee> {
     link =(id===null)?link:link+id
    return this.http.patch<Employee>(link, JSON.stringify(employee), this.httpOptions)
    .pipe(
      retry(0),
      catchError(this.handleError)
    )
  }


  update(link, employee): Observable<Employee> {
    return this.http.patch<Employee>(link, JSON.stringify(employee), this.httpOptions)
    .pipe(
      retry(0),
      catchError(this.handleError)
    )
  }
  // HttpClient API delete() method => Delete
  delete(del,id){
    return this.http.delete<Employee>(del+id, this.httpOptions)
    .pipe(
      retry(0),
      catchError(this.handleError)
    )
  }
  Delete(id){
    return this.http.delete<Employee>(id, this.httpOptions)
    .pipe(
      retry(0),
      catchError(this.handleError)
    )
  }

   searchByName(path:any,name,role): Observable<Employee> {
      let link=`${path}?name=${name}`;
      if(role!=""){
        link+=`&role=admin`
      }
      return this.http.get<Employee>(link)
      .pipe(
        retry(0),
        catchError(this.handleError)
      )
    }


    Search(path:any): Observable<Employee> {
   return this.http.get<Employee>(path)
      .pipe(
        retry(0),
        catchError(this.handleError)
      )
    }

  searchByRole(path:any,name,role): Observable<Employee> {
      return this.http.get<Employee>(`${path}?role=${role} `)
      .pipe(
        retry(0),
        catchError(this.handleError)
      )
    }

//dowmload Excel
      download(url: string): Observable<Blob> {
        return this.http.get(url, {
          responseType: 'blob'
        })
      }
    
      DownloadExcel(link){
      this.download(link).subscribe((data: any) => {
        let url = window.URL.createObjectURL(data);
        let pwa = window.open(url);
        if (!pwa || pwa.closed || typeof pwa.closed == 'undefined') {
            alert( 'Please disable your Pop-up blocker and try again.');
        }
      });
    }

 // Error handling
  handleError(error) {
    return throwError('Error!!:something went wrong!');
  }




}
