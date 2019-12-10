import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Message } from './message';
import { Nickname} from './nickname';

@Injectable({  providedIn: 'root'
})
export class ChatService {
  constructor(private http:HttpClient ) { }

  actionUrl = 'https://myswl1testapp.herokuapp.com/api/';


  //history
  public addToHistory(message:Message): Observable<Message> {
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    };
    return this.http.post<Message>(this.actionUrl+'history', message, options);
  }

  public getHistory(): Observable<Array<Message>>{
    return this.http.get<Array<Message>>(this.actionUrl+'history');
  }

 
  //nicknames

  public getNickname(): Observable<Array<Nickname>>{
    return this.http.get<Array<Nickname>>(this.actionUrl+'nicknames');
  }

  public addNickname(nickname:Nickname): Observable<Nickname> {
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    };
    return this.http.post<Nickname>(this.actionUrl+'nicknames', nickname, options);
  }

}

