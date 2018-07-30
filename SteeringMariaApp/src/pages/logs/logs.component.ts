import { Component, OnInit } from '@angular/core';
import { LogService } from '../../services/log/log.service';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-logs',
  templateUrl: './logs.component.html',
  
})
export class LogsComponent implements OnInit {
  //private logService: LogService;
  constructor(public navCtrl: NavController, public logService: LogService) { 
      //this.logService = logService;
  }
  
  ngOnInit() {
      this.logService.add("Hello");
      this.logService.add("World");
  
  }

}
