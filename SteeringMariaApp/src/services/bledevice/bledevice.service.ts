import { BLE } from '@ionic-native/ble';
import { NgZone } from '@angular/core';
import { Injectable } from '@angular/core';
import { Bledevice } from './bledevice';
import { LogService } from '../../services/log/log.service';

@Injectable(
)
export class BleDeviceService {

  public device: Bledevice;

  constructor(ble:BLE, ngzone:NgZone, logs: LogService) { 
      this.device= new Bledevice(ble,ngzone,logs,"","")
  }
  
  setDevice(json: any){
      let obj = Bledevice.decode(json);
      this.device.id = obj.id
      this.device.name = obj.name
      this.device.connected=false;
      this.device.connect()
      
  }
  
  clearDevice(){
  }
 
  
}
