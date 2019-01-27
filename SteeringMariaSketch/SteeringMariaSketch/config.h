#ifndef PROJECTCONF_h
#define PROJECTCONF_h

// Definitions:

#define FACTORYRESET_ENABLE        1
#define MINIMUM_FIRMWARE_VERSION   "0.7.0"

// The name of the ble-device
#define BLE_DEVICENAME "HF31 Maria"


// The following adresses and definitions _must_ be se same like coded in the app:

// This is the BLE-Gatt-Serviceadress under which all characteristics are
#define BLE_SERVICEADDRESS "0x4d41"

// Definitions to set servo values
#define GATT_UID_SETSERVOPOS "0x1010"
#define  GATT_UID_GETSERVOPOS "0x1011"
#define  GATT_UID_SETSERVOZERO "0x1020"
#define  GATT_UID_GETSERVOZERO "0X1021"
#define  GATT_UID_SETSERVOLEFTLIMIT "0x1030"
#define  GATT_UID_GETSERVOLEFTLIMIT "0x1031"
#define  GATT_UID_SETSERVORIGHTLIMIT "0x1040"
#define  GATT_UID_GETSERVORIGHTLIMIT "0x1041"


// Return a value
#define  GATT_UID_DORETURN "0x1050"


// How many servos do we have?
#define NR_OF_SERVOS 16

#define RESOLUTION_SERVOS 4095


// Here store the servos their datas
#define SERVOS_EEPROM_START 0


#endif
