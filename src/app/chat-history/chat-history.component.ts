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
  public id: Nickname[]=[];
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
    window.setTimeout(() => this.runter.nativeElement.scrollTop = this.runter.nativeElement.scrollHeight, 2000);
    /*if (this.messages.length > 10) {
      this.messages.splice(0, 1);
    }*/
  }

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
    this.scrollen();
  }

  x = setInterval(() => {
    this.chatService.getHistory().subscribe((response: Message[]) => {
      this.messages = response;
      if (this.messages.length > 11) {
        this.messages.splice(0, this.messages.length - 10);
      }
      //this.scrollen();
    })

    /*this.chatService.getNickname().subscribe((response: Nickname[]) => {
      this.nicknames = response;
    })*/

  }, 2000);

  public acceptName() {
    this.rightnow = this.pService.nickname;
    if (this.nickname.match("^(?=.*?[0-9])|(?=.*?[A-Za-z])|(?=.*?[öäüéàè]){3,12}$")) {
      this.pService.nickname = this.nickname;

      if (this.pService.color == null) {
        this.pService.color = this.pService.getRandomColor();
        this.colora = { "color": this.pService.color };
        const nickname = new Nickname(this.pService.nickname);
        this.chatService.addNickname(nickname).subscribe(
          (response: Nickname) => {
            console.log('REST server gave back ' + response);
          }
        )

      }
      else {
        this.newNickname = "Benutzer '" + this.rightnow + "' hat den Nickname zu '" + this.pService.nickname + "' geändert.";
        const benachrichtigung = new Message(null, this.newNickname, null, null);
        this.chatService.addToHistory(benachrichtigung).subscribe(
          (response: Message) => {
            console.log('REST server gave back ' + response);
          }
        )

        this.chatService.getNicknameID().subscribe((response: Nickname[]) => {
          this.nicknames = response;
        })
        

        this.scrollen();
      }
    }
    else {
      this.nickname = null;
      alert("Dies ist kein gültiger Nickname!");
    }
  }
}


