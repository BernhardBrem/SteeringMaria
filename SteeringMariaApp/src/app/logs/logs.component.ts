import { Component, OnInit } from '@angular/core';
import { LogService } from './log.service';
@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {
  private logService: LogService;
  constructor(logService: LogService) { 
      this.logService = logService;
  }
  
  ngOnInit() {
      this.logService.add("Hello");
      this.logService.add("World");
  
  }

}
