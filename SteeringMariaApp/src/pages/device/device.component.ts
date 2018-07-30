import { Component, NgZone } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { BLE } from '@ionic-native/ble';
import { LogService } from '../../services/log/log.service';
import { BleDeviceService } from '../../services/bledevice/bledevice.service';


@Component({
  selector: 'page-device',
  templateUrl: './device.component.html'
})
export class DeviceComponent  {
  
  devices: any[] = [];
  statusMessage: string;

  constructor(public navCtrl: NavController, 
              private toastCtrl: ToastController,
              private ble: BLE,
              private logService: LogService,
              private bleDeviceService: BleDeviceService,
              private ngZone: NgZone) { 
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter');
    //this.scan();
  }

  scan() {
    this.setStatus('Scanning for Bluetooth LE Devices');
    this.devices = [];  // clear list
    this.ble.scan([], 5).subscribe(
      device => this.onDeviceDiscovered(device), 
      error => this.scanError(error)
    );

    setTimeout(this.setStatus.bind(this), 5000, 'Scan complete');
  }

  onDeviceDiscovered(device: any) {
    console.log('Discovered ' + JSON.stringify(device, null, 2));
    this.logService.add('Discovered ' + JSON.stringify(device, null, 2))
    this.ngZone.run(() => {
      this.devices.push(device);
    });
  }

  // If location permission is denied, you'll end up here
  scanError(error: string) {
    this.setStatus('Error ' + error);
    let toast = this.toastCtrl.create({
      message: 'Error scanning for Bluetooth low energy devices',
      position: 'middle',
      duration: 5000
    });
    toast.present();
  }

   setStatus(message: string) {
    console.log(message);
    this.logService.add(message)
    /*this.ngZone.run(() => {
      this.statusMessage = message;
    });*/
    
  } 
  
    deviceSelected(device: any) {
      console.log(JSON.stringify(device) + ' selected');
      this.bleDeviceService.setDevice(device);
    }
}
