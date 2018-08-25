import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LogService } from '../../services/log/log.service';
import { ServoService } from '../../services/servos/servos.service';

@Component({
  selector: 'page-servoSettings',
  templateUrl: './servoSettings.component.html',
  
})
export class ServoSettingsComponent implements OnInit {
  //private logService: LogService;
  constructor(public navCtrl: NavController, public logService: LogService, public servoService:ServoService) { 
      //this.logService = logService;
      
  }
  
  ngOnInit() {
      this.logService.add("Calling Servos!");
  }


}
