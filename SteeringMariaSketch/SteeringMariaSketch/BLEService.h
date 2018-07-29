#ifndef BLEService_h
#define BLEService_h

#include "Adafruit_BLE.h"
#include "Adafruit_BluefruitLE_SPI.h"
/*
 * this class encapsulates the bluetoothLE part of steering the servos.
 */

class BLEService{
  public: 
    // Constructor
    
    static BLEService* getInstance();
    void update();
    bool init();

  protected:
     BLEService();
     void error(const __FlashStringHelper*err);
     // Characteristig IDs
     static int32_t charid_string;
     static int32_t charid_number;
     static int32_t charid_servos_set_direct;
     // Callback functions
     static void connected(void);
     static void disconnected(void);
     static void BleUartRX(char data[], uint16_t len);
     static void BleGattRX(int32_t chars_id, uint8_t data[], uint16_t len);
     static BLEService* instance;
};

#endif
