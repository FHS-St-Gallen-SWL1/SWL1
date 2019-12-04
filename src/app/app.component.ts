import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { ChatHistoryComponent } from './chat-history/chat-history.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  @ViewChild(ChatHistoryComponent, {static: false})
  private chatHistory: ChatHistoryComponent;

  bodyText: string;
  
  constructor() {}


  
  private myVariable = '';
  private myText = '';

  ngOnInit(){
    

  }

  public onMessageSent(message: string) {
    this.chatHistory.addMessage(message);
  }

}
