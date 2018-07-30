import { Injectable } from '@angular/core';
import { Servo } from './servo';
import {ServoConstants} from './servoConstants';
import { LogService } from '../../services/log/log.service';
import { BleDeviceService } from '../../services/bledevice/bledevice.service';
@Injectable(
)
export class ServoService {
  
    // Common definitions . rhey have to be the same as in the 
    // used sketch!
    
    

servos: Servo[] = [];

  constructor(ble: BleDeviceService, log:LogService ) { 
      for (let i=0; i< ServoConstants.NumberOfServos; i++ ){
          this.servos.push(new Servo(i,ble,log));
      }
      
      
  }
  
 
  
  
}

