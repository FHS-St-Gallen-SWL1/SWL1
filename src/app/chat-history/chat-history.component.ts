import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { PersonService } from '../person.service';
import { NgStyle } from '@angular/common';
import { Message } from '../message';
import { ChatService } from '../chat.service';
import { Nickname } from '../nickname';


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
  public nicknames: Nickname[] = [];
  public trim: string;
  public msgbox: string;
  public name: string;
  public nickname: string;
  public colora: object;
  public rightnow: string;
  public newNickname: string;
  public historysize: Object;



  ngOnInit() {

  }

  //Scroll Function
  public scrollen() {
    window.setTimeout(() => this.runter.nativeElement.scrollTop = this.runter.nativeElement.scrollHeight, 25);
  
  }

  //Add Messages Function
  public addMessage(messageString: string) {
    messageString = messageString.trim();
    if (messageString != "") {
      const message = new Message(this.pService.nickname, messageString, new Date(), this.pService.color);
      this.chatService.addToHistory(message).subscribe(
        (response: Message) => {
          console.log('REST server gave back ' + response);
        }

      )
    }
  }



  x = setInterval(() => {
    this.chatService.getHistoryLength().subscribe((response: Object) => {
      this.historysize = response;
    })
//Compare Nicknames: Falls bereits vorhanden wird der alte Nickname überschrieben
    if (JSON.stringify(this.historysize) === JSON.stringify(this.chatService.localhistorylength)) {
    } else {
      this.chatService.getHistory().subscribe((response: Message[]) => {
        if (!this.messages || this.messages[this.messages.length-1] !== response[response.length-1]) {
          this.scrollen();
        }

        //11 Message entfernen
        this.messages = response;
        if (this.messages.length > 11) {
          this.messages.splice(0, this.messages.length - 10);
        }
      })
      this.chatService.localhistorylength = this.historysize;

    }
    this.chatService.getNickname().subscribe((response: Nickname[]) => {
      this.nicknames = response;
    })
  }, 2000);


//Eingabe Nickname
  public acceptName() {
    this.rightnow = this.pService.nickname;
    //Überprüfung ob iO
    if (this.nickname.match("^(\\w)\\S{2,11}$")) {
      this.pService.nickname = this.nickname;
//Farbe setzten falls noch keine gesetzt wurde
      if (this.pService.color == null) {
        this.pService.color = this.pService.getRandomColor();
        this.colora = { "color": this.pService.color };
        const nickname = new Nickname(this.pService.nickname, null);
        this.chatService.addNickname(nickname).subscribe(
          (response: Nickname) => {
            console.log('REST server gave back ' + response);
          }
        )
      }
      else {
        //Benachrichtigung Namensänderung
        this.newNickname = "Benutzer '" + this.rightnow + "' hat den Nickname zu '" + this.pService.nickname + "' geändert.";
        const benachrichtigung = new Message(null, this.newNickname, null, null);
        this.chatService.addToHistory(benachrichtigung).subscribe(
          (response: Message) => {
            console.log('REST server gave back ' + response);
          }
        )
        //hole aktive User
        this.chatService.changeNickname({ "usernameold": this.rightnow, "username": this.pService.nickname }).subscribe(
          (response: Object) => {
            console.log('REST server gave back ' + response);
          }
        )

      }
    }
    else {
      //Meldung ungültiger Nickname
      this.nickname = null;
      alert("Dies ist kein gültiger Nickname!");
    }
  }
}


