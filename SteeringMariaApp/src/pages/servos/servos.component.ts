import { Component, OnInit } from '@angular/core';
import { LogService } from '../../services/log/log.service';
import { ServoService } from '../../services/servos/servos.service';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-servos',
  templateUrl: './servos.component.html',
  
})
export class ServosComponent implements OnInit {
  //private logService: LogService;
  constructor(public navCtrl: NavController, public logService: LogService, public servoService:ServoService) { 
      //this.logService = logService;
  }
  
  ngOnInit() {
      this.logService.add("Calling Servos!");
  }

}
