import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  baseUrl = 'http://localhost:8080';
  private socket: Socket;

  constructor() { 
    this.socket = io(this.baseUrl)
  }

   // Listen for new data
   sendData() {
    this.socket.emit('connection',);
  }


   // Disconnect from the socket
   disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }


}
