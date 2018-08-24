import { Component, OnInit } from '@angular/core';
import { LogService } from '../../services/log/log.service';
import { ServoService } from '../../services/servos/servos.service';
import { Servo } from '../../services/servos/servo';
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

  servoDetails(servo: Servo) {
      console.log(JSON.stringify(servo.id) + ' selected');
      //this.bleDeviceService.setDevice(device);
    }

}
