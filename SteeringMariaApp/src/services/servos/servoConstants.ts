import { Injectable } from '@angular/core';
/* 
These constants need to have exactly the same vals as the constants in the sketch!
 */
@Injectable(
)
export class ServoConstants {
  // Common settings
  static NR_OF_SERVOS = 16;
  static RESOLUTION_SERVOS = 4095
  // The settings for the bluetooth-communication:
  static BLE_SERVICEADDRESS = '4d41';
  static GATT_UID_SETSERVOPOS = '1010';
  static GATT_UID_GETSERVOPOS = '1011';
  static GATT_UID_SETSERVOZERO = '1020';
  static GATT_UID_GETSERVOZERO = '1021';
  static GATT_UID_SETSERVOLEFTLIMIT = '1030';
  static GATT_UID_GETSERVOLEFTLIMIT = '1031';
  static GATT_UID_SETSERVORIGHTLIMIT = '1040';
  static GATT_UID_GETSERVORIGHTLIMIT = '1041';
  static GATT_UID_DORETURN = '1050';


}


