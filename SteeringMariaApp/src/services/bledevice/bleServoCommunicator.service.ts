import { Injectable } from '@angular/core';
import { BleDeviceService } from './bledevice.service';
import { LogService } from '../log/log.service';
import { Servo } from '../servos/servo';
import { ServoConstants } from '../servos/servoConstants';

@Injectable(
)
export class BleServoCommunicatorService {


    ble: BleDeviceService;
    constructor(  private bleDeviceService: BleDeviceService,
                 private log: LogService) {
    }

    // Pack the number to send and the own id in a common array buffer
    toArrayBuffer(servoId: number, para: number) {
        let tempBuffer = new ArrayBuffer(2)
        let fView1 = new Uint16Array(tempBuffer);
        fView1[0] = para;
        let fview2 = new Uint8Array(tempBuffer);
        let result = new ArrayBuffer(3)
        let fview3 = new Uint8Array(result);
        fview3[0] = servoId;
        fview3[1] = fview2[0];
        fview3[2] = fview2[1];
        return result;
    }

    sendPosLike(servo:Servo, posConstant:string){
        let buffer = this.toArrayBuffer(servo.id, servo.pos)
        this.bleDeviceService.device.sendCharacteristic(ServoConstants.BLE_SERVICEADDRESS, posConstant, buffer);
    }
    
    sendPos(servo: Servo) {
        this.sendPosLike(servo,ServoConstants.GATT_UID_SETSERVOPOS)
    }

    sendZero(servo: Servo): any {
        this.sendPosLike(servo,ServoConstants.GATT_UID_SETSERVOZERO)
    }

    updateServoZero(servo:Servo,count:number){
        servo.zero=count;
        this.log.add("Set servo zero of servo " + servo.id.toString() + " to " + count.toString());
        console.log("Set servo zero of servo " + servo.id.toString() + " to " + count.toString());
    }

    requestZero(servo: Servo): any {
        console.log("bleServoCommunicatorService:RequestZero!");
        this.bleDeviceService.device.getBufferFromDevice(ServoConstants.BLE_SERVICEADDRESS, ServoConstants.GATT_UID_GETSERVOZERO, servo, this.updateServoZero );
    }

}