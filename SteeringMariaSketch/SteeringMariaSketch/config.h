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
#define GATT_UID_SETSERVO "0x1010"

// How many servos do we have?
#define NR_OF_SERVOS 16

#define RESOLUTION_SERVOS 4095


// Here store the servos their datas
#define SERVOS_EEPROM_START 0


#endif
