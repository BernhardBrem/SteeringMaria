
import { LogService } from '../../services/log/log.service';
import { BleServoCommunicatorService } from '../../services/bledevice/bleServoCommunicator.service';
import { ServoConstants } from './servoConstants';

export class Servo {
    id: number;
    pos: number;
    leftLimit: number;
    rightLimit: number;
    zero: number;
    bleServo: BleServoCommunicatorService;
    log: LogService;



    constructor(nr: number, bleServo: BleServoCommunicatorService, log: LogService) {
        this.id = nr;
        this.pos = 0;
        this.leftLimit=0;
        this.rightLimit=ServoConstants.resolution_servos;
        this.zero=0;
        this.bleServo = bleServo;
        this.log = log;
    }

    
    // Sending the position to ble!
    sendPos() {
       
        this.bleServo.sendPos(this);
    }

}