import { Injectable } from '@angular/core';
import { Socket, io } from 'socket.io-client';
import { environment } from 'src/environment';
@Injectable({
  providedIn: 'root'
})
export class SocketIoService {
  private socket: any;
  baseURL = environment.baseUrl;
  constructor() {
    this.socket = io(this.baseURL)
  }

  onNewBlog(callback: (data: any) => void) {
    this.socket.on('newBlog', callback);
  }

}
