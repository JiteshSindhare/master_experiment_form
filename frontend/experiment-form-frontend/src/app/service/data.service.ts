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
      this.backendRoute+'/api/deleteExperiment/'+id,
      { headers }
    );
  }

  getExperiment(id){
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return this.http.get<any>(
      this.backendRoute+'/api/getExperiment/'+id,
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

  getAllExperiments(){
    let headers: HttpHeaders = new HttpHeaders();
    return this.http.get<any>(
      this.backendRoute+'/api/getAllExperiments',
      { headers }
    );
  }

  changeExperimentStatus(id){
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return this.http.put<any>(
      this.backendRoute+'/api/toggleExperimentStatus/'+id,
      { headers }
    );
  }

  addOption(id,data){
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return this.http.post<any>(
      this.backendRoute+'/api/addOption/'+id,
      data,
      { headers }
    );
  }

  getExperimentByName(name){
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return this.http.get<any>(
      this.backendRoute+'/api/getExperimentByName/'+name,
      { headers }
    );
  }
  submitExperimentResponse(id,data){
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return this.http.post<any>(
      this.backendRoute+'/api/experimentResponse/'+id,
      data,
      { headers }
    );
  }
}
