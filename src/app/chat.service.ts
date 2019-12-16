import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Message } from './message';
import { Nickname } from './nickname';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  constructor(private http: HttpClient) { }

  actionUrl = 'https://myswl1testapp.herokuapp.com/api/';


  //history
  public addToHistory(message: Message): Observable<Message> {
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    };
    return this.http.post<Message>(this.actionUrl + 'history', message, options);
  }

  public getHistory(): Observable<Array<Message>> {
    return this.http.get<Array<Message>>(this.actionUrl + 'history');
  }


  //nicknames

  public getNickname(): Observable<Array<Nickname>> {
    return this.http.get<Array<Nickname>>(this.actionUrl + 'nicknames');
  }

  public getNicknameID(): Observable<Array<Nickname>> {
    return this.http.get<Array<Nickname>>(this.actionUrl + 'nicknames/:id');
  }

  public addNickname(nickname: Nickname): Observable<Nickname> {
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    };
    return this.http.post<Nickname>(this.actionUrl + 'nicknames', nickname, options);
  }

  public changeNickname(changeusername: Object): Observable<Object> {
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    };
    return this.http.post<Object>(this.actionUrl + 'changenickname', changeusername, options );
  }

  //History check
  private localHistoryLength: Object;

  public get localhistorylength(): Object{
    return this.localHistoryLength;
  }
  public set localhistorylength(value: Object){
    this.localHistoryLength = value;
  }

  public getHistoryLength(): Observable<Object>{
    return this.http.get<Object>(this.actionUrl +'historylength');
  }

}

