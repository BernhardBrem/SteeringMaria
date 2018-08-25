import { Injectable } from '@angular/core';
import { Servo } from './servo';
import { ServoConstants } from './servoConstants';
import { LogService } from '../../services/log/log.service';
import { BleServoCommunicatorService } from '../../services/bledevice/bleServoCommunicator.service';
@Injectable(
)
export class ServoService {

    // Common definitions . rhey have to be the same as in the 
    // used sketch!

    currentServo: Servo;

    servos: Servo[] = [];

    constructor(ble: BleServoCommunicatorService, log: LogService) {
        for (let i = 0; i < ServoConstants.NumberOfServos; i++) {
            this.servos.push(new Servo(i, ble, log));
        }


    }




}

