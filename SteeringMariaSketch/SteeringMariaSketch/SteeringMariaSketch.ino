
/*********************************************************************
 This is an example for our nRF51822 based Bluefruit LE modules

 Pick one up today in the adafruit shop!

 Adafruit invests time and resources providing this open source code,
 please support Adafruit and open-source hardware by purchasing
 products from Adafruit!

 MIT license, check LICENSE for more information
 All text above, and the splash screen below must be included in
 any redistribution
*********************************************************************/

#include <Arduino.h>
#include <SPI.h>
#include "Adafruit_BLE.h"
#include "Adafruit_BluefruitLE_SPI.h"
#include "Adafruit_BluefruitLE_UART.h"
#include "BLEService.h"
#include "ServoService.h"
#if SOFTWARE_SERIAL_AVAILABLE
  #include <SoftwareSerial.h>
#endif



// Create the bluefruit object, either software serial...uncomment these lines

BLEService * smble = BLEService::getInstance();
ServoService * sservice=ServoService::getInstance();


// Variables for characteristics:
/*
int32_t charid_string;
int32_t charid_number;
int32_t charid_servos_set_direct;
*/

/**************************************************************************/
/*!
    @brief  Sets up the HW an the BLE module (this function is called
            automatically on startup)
*/
/**************************************************************************/
void setup(void)
{
  while (!Serial);  // required for Flora & Micro
  delay(500);

  Serial.begin(115200);
  Serial.println(F("Steering Maria"));
  Serial.println(F("-------------------------------------"));

  /* Initialise the modules */
  Serial.print(F("Initialising the servo: "));
 if (! sservice->init()){
    Serial.println("Failed to init servos");
  }

  if (! smble->init()){
    Serial.println("Failed to init bloetooth!");
  }
  
  Serial.println(F("Initialized"));


}



/**************************************************************************/
/*!
    @brief  Constantly poll for new command or response data
*/
/**************************************************************************/
void loop(void)
{
  smble->update();
}
