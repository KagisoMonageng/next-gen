import { Injectable } from '@angular/core';
import { Socket, io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketIoService {
  private socket: any;
  baseURL = 'http://localhost:8080/'
  constructor() {
    this.socket = io(this.baseURL)
  }

  onNewBlog(callback: (data: any) => void) {
    this.socket.on('newBlog', callback);
  }

}
