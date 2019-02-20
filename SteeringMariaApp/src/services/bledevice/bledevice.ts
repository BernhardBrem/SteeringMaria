
import { BLE } from '@ionic-native/ble';
import { NgZone } from '@angular/core';
import { LogService } from '../../services/log/log.service';
import { ServoConstants } from '../servos/servoConstants';
import { AwaitLock } from './awaitLock'


interface bleJSON {
    name: string;
    age: number;
    created: string;
}



export class Bledevice {

    public connected: boolean;
    public peripheral: any = {};
    private lock: AwaitLock;
    
    constructor(
        public ble: BLE,
        public ngZone: NgZone,
        public logs: LogService,
        public name: string,
        public id: string,

    ) {
        this.connected = false;
        this.lock=new AwaitLock()
    }

    connect() {
        this.ble.connect(this.id).subscribe(
            peripheral => this.onConnected(peripheral),
            peripheral => this.onDeviceDisconnected(peripheral)
        );
    }
    



    onConnected(peripheral: any) {
        this.ngZone.run(() => {
            this.peripheral = peripheral;
            this.logs.add(JSON.stringify(peripheral, null, 2))
            this.connected = true;
            // Test-Code: Send command 

        });
    }

    onDeviceDisconnected(peripheral: any) {
        this.connected = false
    }


    static decode(json: bleJSON): Bledevice {
        let bdev = Object.create(Bledevice.prototype);
        return Object.assign(bdev, json, {

        });
    }
    
    async sendCharacteristic(service:string, characteristic:string, buffer:ArrayBuffer) {
        console.log("Send char " + characteristic + " to service " + service)
        await this.lock.acquireAsync()
        this.ble.write(this.peripheral.id, service, characteristic, buffer).then(
            () => {
                console.log("Success!");
                this.logs.add("Success Send command succeeded!");
                this.lock.release()
            }, 
            e => {
            console.log('Error!' + e);
            this.logs.add("Error Send command!");
            this.lock.release();
            }
        ).catch(e => {
            this.logs.add("Error Send command!");
            this.logs.add(e);
            this.lock.release()
        })
    }



    async getBufferFromDevice(service:string, characteristic:string, obToAttach: any, setter: (arg0: any,arg1: any) => any ) {
        // We need a payload for writing to the device, lets create one
        console.log("get buffer for " + characteristic + " of service " + service)
        let buffer = new ArrayBuffer(1);
        buffer[0]=1;
        await this.lock.acquireAsync()
        this.ble.write(this.peripheral.id, service, characteristic,buffer).then(
            () => {
                this.ble.read(this.peripheral.id,service,ServoConstants.GATT_UID_DORETURN).then(

                    data => {
                        console.log("Got data!");
                        setter(obToAttach, data);
                        this.lock.release();
                    },
                    () => {
                        console.log('Error! No data!' )
                        this.lock.release()
                    }
                ).catch(e =>{
                        console.log('Error! ' )
                        console.log(e)
                        this.lock.release()
                })

            },
            e => {
                 console.log('Error!' + e)
                 this.lock.release()
            }
        ).catch(
            e => {
                 console.log('Error!' + e)
                 this.lock.release()
            }
        )        
    }
    

}
