import { Injectable } from '@angular/core';
import { Logentry } from './logentry';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor() { 
  }
  logs: Logentry[] = [];
 
  add(msg : string) {
    this.logs.push(new Logentry(msg));
  }
 
  clear() {
    this.logs = [];
  }
  
}

