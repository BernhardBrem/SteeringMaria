
import { BLE } from '@ionic-native/ble';
import { NgZone } from '@angular/core';
import { LogService } from '../../services/log/log.service';
import { ServoConstants } from '../servos/servoConstants';


interface bleJSON {
    name: string;
    age: number;
    created: string;
}



export class Bledevice {

    public connected: boolean;
    public peripheral: any = {};

    constructor(
        public ble: BLE,
        public ngZone: NgZone,
        public logs: LogService,
        public name: string,
        public id: string,

    ) {
        this.connected = false;
    }

    connect() {
        this.ble.connect(this.id).subscribe(
            peripheral => this.onConnected(peripheral),
            peripheral => this.onDeviceDisconnected(peripheral)
        );
    }



    onConnected(peripheral) {
        this.ngZone.run(() => {
            this.peripheral = peripheral;
            this.logs.add(JSON.stringify(peripheral, null, 2))
            this.connected = true;
            // Test-Code: Send command 

        });
    }

    onDeviceDisconnected(peripheral) {
        this.connected = false
    }


    static decode(json: bleJSON): Bledevice {
        let bdev = Object.create(Bledevice.prototype);
        return Object.assign(bdev, json, {

        });
    }

    sendCharacteristic(service, characteristic, buffer) {
        this.ble.write(this.peripheral.id, service, characteristic, buffer).then(
            () => {
                console.log("Success!");
                this.logs.add("Sending test command succeeded!")
            }, 
            e => {
            console.log('Error!' + e);
            this.logs.add("Sending command failed!!")
            }
        )
    }



    getBufferFromDevice(service:string, characteristic:string, obToAttach: any, setter: (arg0: any,arg1: any) => any ) {
        // We need a payload for writing to the device, lets create one
        let buffer = new ArrayBuffer(1);
        buffer[0]=1;
        this.ble.write(this.peripheral.id, service, characteristic,buffer).then(
            () => {
                this.ble.read(this.peripheral.id,service,ServoConstants.GATT_UID_DORETURN).then(

                    data => setter(obToAttach, data),
                    () => console.log('Error! No data!' )
                )

            },
            e => console.log('Error!' + e)
        )


        return 0
    }


}
