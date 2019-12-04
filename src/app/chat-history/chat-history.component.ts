import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { PersonService } from '../person.service';
import { NgStyle } from '@angular/common';
import { Message } from '../message';
import { ChatService } from '../chat.service';


@Component({
  selector: 'app-chat-history',
  templateUrl: './chat-history.component.html',
  styleUrls: ['./chat-history.component.css']

})

export class ChatHistoryComponent implements OnInit {

  @ViewChild('runter', { static: false })
  private runter: ElementRef;

  constructor(public pService: PersonService, public chatService: ChatService) { }


  public messages: Message[] = [];
  public trim: string;
  public msgbox: string;
  public name: string;
  public nickname: string;
  public colora: object;
  public rightnow: string;
  public newNickname: string;



  ngOnInit() {

  }

  public scrollen() {
    window.setTimeout(() => this.runter.nativeElement.scrollTop = this.runter.nativeElement.scrollHeight, 10);
    /*if (this.messages.length > 10) {
      this.messages.splice(0, 1);
    }*/
  }

  public addMessage(messageString: string) {
    messageString = messageString.trim();
    if (messageString != "") {
      const message = new Message(this.pService.nickname, messageString, new Date());
      this.chatService.addToHistory(message).subscribe(
        (response: Message) => {
          console.log('REST server gave back ' + response);
        }
      )
    }
    //this.scrollen();
  }

  x = setInterval(()=>{
    this.chatService.getHistory().subscribe((response: Message[]) => {
    this.messages =response;
    if (this.messages.length >11){
      this.messages.splice(0,this.messages.length-10);
    }
    this.scrollen();
  })
  
},2000);

  public acceptName() {
    this.rightnow = this.pService.nickname;
    if (this.nickname.match("^[a-zA-Z0-9._\-]{3,12}$")) {
      this.pService.nickname = this.nickname;
      if (this.pService.color == null) {
        this.pService.color = this.pService.getRandomColor();
        this.colora = { "color": this.pService.color };
      }
      else {
        this.newNickname = "Benutzer '" + this.rightnow + "' hat den Nickname zu '" + this.pService.nickname + "' geändert.";
        const benachrichtigung = new Message(null, this.newNickname, null);
        this.chatService.addToHistory(benachrichtigung).subscribe(
          (response: Message) => {
            console.log('REST server gave back ' + response);
          }
        )
        //this.messages.push(benachrichtigung);
        //this.scrollen();
      }
    }
    else {
      this.nickname = null;
      alert("Dies ist kein gültiger Nickname!");
    }
  }
}


