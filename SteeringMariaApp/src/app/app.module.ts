import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';


import { TabsPage } from '../pages/tabs/tabs';
import {LogsComponent} from '../pages/logs/logs.component';
import {DeviceComponent} from '../pages/device/device.component';
import {ServosComponent} from '../pages/servos/servos.component';
import {ServoSettingsComponent} from '../pages/servoSettings/servoSettings.component';


import {LogService} from '../services/log/log.service';
import {BleDeviceService} from '../services/bledevice/bledevice.service';
import {BleServoCommunicatorService } from '../services/bledevice/bleServoCommunicator.service';
import {ServoService} from '../services/servos/servos.service';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BLE } from '@ionic-native/ble';

@NgModule({
  declarations: [
    MyApp,
 //   AboutPage,
 //   ContactPage,
//    HomePage,
    
    TabsPage,
    DeviceComponent,
    ServosComponent,
    ServoSettingsComponent,
    LogsComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    DeviceComponent,
    ServosComponent,
    LogsComponent,
    ServoSettingsComponent
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    LogService,
    BleDeviceService,
    BleServoCommunicatorService, 
    ServoService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BLE
  ]
})
export class AppModule {}
