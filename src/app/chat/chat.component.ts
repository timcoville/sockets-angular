import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  message;
  socket;
  messages;
  constructor(){
    this.socket = io();
    this.messages = []
    this.socket.on('greeting', (data)=>{ //4
      console.log(data.msg); //5
      this.socket.emit('thankyou', { msg: 'Thank you for connecting me! -Client' }); //6
    });
    this.socket.on('updateall', (data)=>{
      console.log(data)
      this.messages.push(data)
    })
  }

  ngOnInit() {
    console.log(this.socket)
    this.message = "";

  }

  sendMessage(){
    this.socket.emit('message', { msg: this.message, id: this.socket.id})
    this.message = "";
    
  }

}
