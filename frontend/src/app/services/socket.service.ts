import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  baseURL = environment.baseUrl;
  private socket: Socket;

  constructor() { 
    this.socket = io(this.baseURL)
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
