import { BLE } from '@ionic-native/ble';
import { NgZone } from '@angular/core';
import { Injectable } from '@angular/core';
import { BleDeviceService } from './bledevice.service';
import { LogService } from '../log/log.service';
import { Servo } from '../servos/servo';
import { ServoConstants } from '../servos/servoConstants';

@Injectable(
)
export class BleServoCommunicatorService {

    ble: BleDeviceService;
    constructor( ble: BleDeviceService, log: LogService) {
        
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
    
    sendPos(servo: Servo) {
        let buffer = this.toArrayBuffer(servo.id, servo.pos)
        this.ble.device.sendCharacteristic(ServoConstants.servoService, ServoConstants.GATT_UID_SETSERVOPOS, buffer);
    }

}