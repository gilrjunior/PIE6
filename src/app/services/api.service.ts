import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Mongo } from '../Imodel/mongo';
import { Iregavel } from '../isRegavel/iregavel';
import { Iregando } from '../Regando/iregando';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {  }

  getinfo(){

    return this.http.get<Mongo[]>(`http://localhost:8000/arduino/get`,{observe: 'response'})

  }

  postRegavel(isRegavel:Iregavel){

    return this.http.post<Iregavel>(`http://localhost:8000/arduino/regavel`,isRegavel,{observe: 'response'})

  }

  getRegando(){

    return this.http.get<Iregando>(`http://localhost:8000/arduino/regando`,{observe: 'response'})

  }

}
