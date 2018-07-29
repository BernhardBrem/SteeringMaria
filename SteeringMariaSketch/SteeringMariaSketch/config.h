#ifndef PROJECTCONF_h
#define PROJECTCONF_h

// Definitions:

#define FACTORYRESET_ENABLE        1
#define MINIMUM_FIRMWARE_VERSION   "0.7.0"

// The name of the ble-device
#define ble_devicename "HF31 Maria"


// The following adresses and definitions _must_ be se same like coded in the app:

// This is the BLE-Gatt-Serviceadress under which all characteristics are
#define ble_serviceaddress "0x4d41"

// Definitions to set servo values
#define gatt_uid_setservo "0x1010"

// How many servos do we have?
#define nr_of_servos 2


#endif
