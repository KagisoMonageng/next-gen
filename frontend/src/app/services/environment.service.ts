import { Injectable } from '@angular/core';

declare global {
  interface Window {
    __env: {
      baseUrl: string;
      cloudinaryUrl: string;
      googleClientID: string;
    };
  }
}

@Injectable({ providedIn: 'root' })
export class EnvironmentService {
  get baseUrl(): string {
    return window.__env?.baseUrl || '';
  }

  get cloudinaryUrl(): string {
    return window.__env?.cloudinaryUrl || '';
  }

  get googleClientID(): string {
    return window.__env?.googleClientID || '';
  }
}