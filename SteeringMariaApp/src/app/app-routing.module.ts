import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LogsComponent} from './logs/logs.component'
import {DeviceComponent} from './device/device.component'

const routes: Routes = [
    {path: 'logs', component: LogsComponent, data: {label: 'Logs'}},
    {path: 'device', component: DeviceComponent, data:{label: 'Device'}}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
