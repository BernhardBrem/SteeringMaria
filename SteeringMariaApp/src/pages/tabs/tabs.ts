import { Component } from '@angular/core';

import {DeviceComponent} from '../device/device.component';
import {ServosComponent} from '../servos/servos.component';
import {LogsComponent} from '../logs/logs.component';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tabDeviceRoot=DeviceComponent;
  tabServosRoot=ServosComponent;
  tabLogsRoot=LogsComponent;
  constructor() {
  }
}
