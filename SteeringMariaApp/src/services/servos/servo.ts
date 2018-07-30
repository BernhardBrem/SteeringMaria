
import { LogService } from '../../services/log/log.service';
import { BleDeviceService } from '../../services/bledevice/bledevice.service';
import {ServoConstants} from './servoConstants';

export class Servo {
  id: number;
  pos: number;
  ble: BleDeviceService;
  log: LogService;
   
  
  
  constructor(nr: number,ble: BleDeviceService, log: LogService){
      this.id = nr;
      this.pos=0;
      this.ble=ble;
      this.log=log;
  }
  
  // Pack the number to send and the own id in a common array buffer
  toArrayBuffer(para: number){
     let tempBuffer = new ArrayBuffer(2)
     let fView1 = new Uint16Array(tempBuffer);
     fView1[0]=para;
     let fview2=new Uint8Array(tempBuffer); 
     let result=new ArrayBuffer(3)
     let fview3=new Uint8Array(result);
      fview3[0] = this.id;
      fview3[1]=fview2[0];
      fview3[2]=fview2[1];
      return result;
  }
  
  // Sending the position to ble!
  sendPos(){
      let buffer = this.toArrayBuffer(this.pos)
      this.ble.device.sendCharacteristic(ServoConstants.servoService, ServoConstants.setServoCharacteristic,buffer); 
   }
  
}