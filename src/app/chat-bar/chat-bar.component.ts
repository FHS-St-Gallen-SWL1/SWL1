import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { PersonService } from '../person.service';

@Component({
  selector: 'app-chat-bar',
  templateUrl: './chat-bar.component.html',
  styleUrls: ['./chat-bar.component.css']
})
export class ChatBarComponent implements OnInit {
  
  public msgbox: string;

  @Input()
  

  @Output()
  msgEvent = new EventEmitter<string>();
  
   

  constructor(public pService: PersonService) { } 
  public name: string;
  public nname: string;

  ngOnInit() {
    
  }

 

  public onSendClicked() {
      this.msgEvent.emit(this.msgbox);
      this.msgbox = null
  }
}



