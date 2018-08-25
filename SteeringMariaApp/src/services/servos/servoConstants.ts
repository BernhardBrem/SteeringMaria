import { Injectable } from '@angular/core';
/* 
These constants need to have exactly the same vals as the constants in the sketch!
 */
 @Injectable(
)
 export class ServoConstants{
   static NR_OF_SERVOS=16;
   static BLE_SERVICEADDRESS='4d41' ;
   static GATT_UID_SETSERVOPOS= '1010';
   static RESOLUTION_SERVOS = 4095
 }


