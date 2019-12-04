import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonService {



  constructor() { }


  private myNickname: string;
  private myColor: string;

  public get nickname():string {
    return this.myNickname;
  }

  public set nickname(value: string) {
    this.myNickname = value;
  }
  public get color():string {
    return this.myColor;
  }

  public set color(value: string) {
    this.myColor = value;
  }
  
  getRandomColor() {
    var myColor = Math.floor(0x1000000 * Math.random()).toString(16);
    return '#' + ('000000' + myColor).slice(-6);
  }

 
}
