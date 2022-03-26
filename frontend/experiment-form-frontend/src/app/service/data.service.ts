import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }
  backendRoute = 'http://localhost:8000'

  addExperimentName(data){
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return this.http.post<any>(
      this.backendRoute+'/api/addExperiment',
      data,
      { headers }
    );
  }

  deleteExperimentName(id){
    let headers: HttpHeaders = new HttpHeaders();
    // headers = headers.append('Content-Type', 'application/json');
    return this.http.delete<any>(
      '/api/deleteExperiment'+id,
      { headers }
    );
  }

  getExperiment(id){
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return this.http.delete<any>(
      '/api/getExperiment'+id,
      { headers }
    );
  }

  addQuestion(data,id){
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return this.http.post<any>(
      this.backendRoute+'/api/addQuestion/'+id,
      data,
      { headers }
    );
  }
}
