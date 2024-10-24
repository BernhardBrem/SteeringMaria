#include "BLEService.h"
#include "ServoService.h"
#include <Arduino.h>
#include "Adafruit_BluefruitLE_SPI.h"
#include "BluefruitConfig.h"
#include "config.h"

/**  Library SETTINGS

      FACTORYRESET_ENABLE     Perform a factory reset when running this sketch
     
                              Enabling this will put your Bluefruit LE module
                            in a 'known good' state and clear any config
                            data set in previous sketches or projects, so
                              running this at least once is a good idea.
     
                              When deploying your project, however, you will
                            want to disable factory reset by setting this
                            value to 0.  If you are making changes to your
                              Bluefruit LE device via AT commands, and those
                            changes aren't persisting across resets, this
                            is the reason why.  Factory reset will erase
                            the non-volatile memory where config data is
                            stored, setting it back to factory default
                            values.
         
                              Some sketches that require you to bond to a
                            central device (HID mouse, keyboard, etc.)
                            won't work at all with this feature enabled
                            since the factory reset will clear all of the
                            bonding data stored on the chip, meaning the
                            central device won't be able to reconnect.

    MINIMUM_FIRMWARE_VERSION  Minimum firmware version to have some new features
*/

// Defs for the GATT-Cmds
#define NAMECMD "AT+GAPDEVNAME=" BLE_DEVICENAME
#define GATTADDSERVICE "AT+GATTADDSERVICE=uuid=" BLE_SERVICEADDRESS
#define GATT_SERVO_PRE "AT+GATTADDCHAR=UUID="
#define GATT_SERVO_POST ",PROPERTIES=0x08,MIN_LEN=3,MAX_LEN=3,DATATYPE=INTEGER,DESCRIPTION=number,VALUE=0"
#define GATT_SERVO_GET_POST ",PROPERTIES=0x08,MIN_LEN=1,MAX_LEN=1,DATATYPE=INTEGER,DESCRIPTION=number,VALUE=0"

#define GATT_SERVO_SETPOS GATT_SERVO_PRE GATT_UID_SETSERVOPOS GATT_SERVO_POST
#define GATT_SERVO_SETZERO GATT_SERVO_PRE GATT_UID_SETSERVOZERO GATT_SERVO_POST
#define GATT_SERVO_GETPOS GATT_SERVO_PRE GATT_UID_GETSERVOPOS GATT_SERVO_GET_POST
#define GATT_SERVO_GETZERO GATT_SERVO_PRE GATT_UID_GETSERVOZERO GATT_SERVO_GET_POST

#define GATT_RETUTNCHANNEL GATT_SERVO_PRE GATT_UID_DORETURN ", PROPERTIES=0x10, MIN_LEN=2, MAX_LEN=2, VALUE=00-40"


// Static vars
// Only for testing
/*
  int32_t BLEService::charid_string;
  int32_t BLEService::charid_number;
*/
// The callback ids
int32_t BLEService::charid_servos_setpos;
int32_t BLEService::charid_servos_getpos;
int32_t BLEService::charid_servos_setzero;
int32_t BLEService::charid_servos_getzero;
int32_t BLEService::charid_backchannel;

// The device
//SoftwareSerial bluefruitSS = SoftwareSerial(BLUEFRUIT_SWUART_TXD_PIN, BLUEFRUIT_SWUART_RXD_PIN);

// Adafruit_BluefruitLE_UART ble(bluefruitSS, BLUEFRUIT_UART_MODE_PIN,
//                      BLUEFRUIT_UART_CTS_PIN, BLUEFRUIT_UART_RTS_PIN);

/* ...or hardware serial, which does not need the RTS/CTS pins. Uncomment this line */
//Adafruit_BluefruitLE_UART ble(BLUEFRUIT_HWSERIAL_NAME, BLUEFRUIT_UART_MODE_PIN);

/* ...hardware SPI, using SCK/MOSI/MISO hardware SPI pins and then user selected CS/IRQ/RST */
// Das sollte es eigentlich sein!

Adafruit_BluefruitLE_SPI ble(BLUEFRUIT_SPI_CS, BLUEFRUIT_SPI_IRQ, BLUEFRUIT_SPI_RST);

/* ...software SPI, using SCK/MOSI/MISO user-defined SPI pins and then user selected CS/IRQ/RST */
//Adafruit_BluefruitLE_SPI ble(BLUEFRUIT_SPI_SCK, BLUEFRUIT_SPI_MISO,
//                             BLUEFRUIT_SPI_MOSI, BLUEFRUIT_SPI_CS,
//                             BLUEFRUIT_SPI_IRQ, BLUEFRUIT_SPI_RST);

// Servo Service
ServoService *sinstance = ServoService::getInstance();
//CallBacks:

void BLEService::connected(void)
{
  Serial.println(F("Connected"));
}

void BLEService::disconnected(void)
{
  Serial.println(F("Disconnected"));
}

void BLEService::BleUartRX(char data[], uint16_t len)
{
  Serial.print(F("[BLE UART RX]"));
  Serial.write(data, len);
  Serial.println();
}

int8_t dataToServoNr(uint8_t data[]) {
  return uint8_t(data[0]);
}

int16_t dataToPos(uint8_t data[])
{
  uint8_t data1[2];
  for (int i = 0; i < 2; i++)
  {
    data1[i] = data[i + 1];
  }
  int16_t pos;
  memcpy(&pos, data1, 2);
  return pos;
}




void BLEService::BleGattRX(int32_t chars_id, uint8_t data[], uint16_t len)
{
  Serial.print( F("[BLE GATT RX] (" ) );
  Serial.print(chars_id);
  Serial.print(F(") "));
  /*
    if (chars_id == charid_string)
    {
      Serial.write(data, len);
      Serial.println();
    }
    else if (chars_id == charid_number)
    {
      int32_t val;
      memcpy(&val, data, len);
      Serial.println(val);
    }
    else */
  if (chars_id == charid_servos_setpos)
  {
    /* uint8_t data1[2];
      for (int i = 0; i < 2; i++)
      {
      data1[i] = data[i + 1];
      }
      int16_t pos;
      memcpy(&pos, data1, 2);

      sinstance->setPos(uint8_t(data[0]), pos);
    */
    sinstance->setPos(dataToServoNr(data), dataToPos(data));
  }
  else if (chars_id == charid_servos_setzero)
  {
    sinstance->setZero(dataToServoNr(data), dataToPos(data));
  }
  else if (chars_id == charid_servos_getzero) {
    Serial.println(F("Requesting zero pos"));
    uint16_t pos = sinstance->getZero(dataToServoNr(data));
    Serial.print(F("Sending!"));
    Serial.print(pos,HEX);
    ble.print( F("AT+GATTCHAR=") );
    ble.print( charid_backchannel );
    ble.println(pos);
    Serial.println(F("Sent!"));
  }



}

// Ende Callbacks

BLEService *BLEService::instance = 0;

BLEService *BLEService::getInstance()
{
  if (instance == 0)
  {
    instance = new BLEService();
    Serial.println("Create BLE Singelton\n");
  }

  return instance;
}

// The constructor; it is protected since we have a singleton
BLEService::BLEService()
{
  //Serial.println(F("Constructor SMBlue"));
}

bool BLEService::init()
{
  Serial.println(F("1 OK!\n"));

  if (!ble.begin(VERBOSE_MODE))
  {
    Serial.println(F("2 NOK! \n"));
    //error(F("Couldn't find Bluefruit, make sure it's in CoMmanD mode & check wiring?"));
  }
  Serial.println(F("2 OK! \n"));
  Serial.println(F("Init the service!"));
  Serial.println(F("XXXX"));

  //if ( !ble.begin(VERBOSE_MODE) )
  //{
  //  error(F("Couldn't find Bluefruit, make sure it's in CoMmanD mode & check wiring?"));
  //}
  Serial.println(F("OK!"));
  Serial.println(F("...1"));
  if (FACTORYRESET_ENABLE)
  {
    /* Perform a factory reset to make sure everything is in a known state */
    Serial.println(F("Performing a factory reset: "));
    if (!ble.factoryReset())
    {
      Serial.println(F("Couldn't factory reset"));
      return false;
    }
  }

  Serial.println(F("...2"));

  if (!ble.sendCommandCheckOK(F(NAMECMD)))
  {
    Serial.println("Could not set name!");
    //error(F("Could not set device name?"));
  }

  if (!ble.isVersionAtLeast(MINIMUM_FIRMWARE_VERSION))
  {
    return false;
  }
  Serial.println(F("...3"));
  Serial.println(F("Adding Service"));
  Serial.println(F(GATTADDSERVICE));
  // The service:
  ble.sendCommandCheckOK(F(GATTADDSERVICE));
  // Testing-chars - have to be removed
  /*
    ble.sendCommandWithIntReply(F("AT+GATTADDCHAR=UUID=0x2000,PROPERTIES=0x08,MIN_LEN=1,MAX_LEN=6,DATATYPE=string,DESCRIPTION=string,VALUE=abc"), &charid_string);
    ble.sendCommandWithIntReply(F("AT+GATTADDCHAR=UUID=0x2001,PROPERTIES=0x08,MIN_LEN=4,MAX_LEN=4,DATATYPE=INTEGER,DESCRIPTION=number,VALUE=0"), &charid_number);
  */
  // Set servo position direct:
  // One byte to adress the servo, 2 bytes for the value
  Serial.print(F("sendCommandWithIntReply(): "));
  Serial.print(F(GATT_SERVO_SETPOS));
  ble.sendCommandWithIntReply(F(GATT_SERVO_SETPOS), &charid_servos_setpos);
  Serial.print(F("sendCommandWithIntReply(): "));
  Serial.print(F(GATT_SERVO_SETZERO));
  ble.sendCommandWithIntReply(F(GATT_SERVO_SETZERO), &charid_servos_setzero);
  Serial.print(F("sendCommandWithIntReply(): "));
  Serial.print(F(GATT_SERVO_GETPOS));
  ble.sendCommandWithIntReply(F(GATT_SERVO_GETPOS), &charid_servos_getpos);
  Serial.print(F("sendCommandWithIntReply(): "));
  Serial.print(F(GATT_SERVO_GETZERO));
  ble.sendCommandWithIntReply(F(GATT_SERVO_GETZERO), &charid_servos_getzero);
  ble.sendCommandWithIntReply( F(GATT_RETUTNCHANNEL), &charid_backchannel);
  

  /* Reset the device for the new service setting changes to take effect */
  Serial.print(F("Performing a SW reset (service changes require a reset): "));
  ble.reset();

  // Disable command echo from Bluefruit
  ble.echo(false);

  Serial.println("Requesting Bluefruit info:");
  // Print Bluefruit information
  ble.info();

  // Set callbacks
  ble.setConnectCallback(connected);
  ble.setDisconnectCallback(disconnected);
  ble.setBleUartRxCallback(BleUartRX);

  // Only one BLE GATT function should be set, it is possible to set it
  //multiple times for multiple Chars ID
  /*
    ble.setBleGattRxCallback(charid_string, BleGattRX);
    ble.setBleGattRxCallback(charid_number, BleGattRX);
  */
  Serial.println(F("Set callback for set servos "));
  ble.setBleGattRxCallback(charid_servos_setpos, BleGattRX);
  ble.setBleGattRxCallback(charid_servos_setzero, BleGattRX);
  ble.setBleGattRxCallback(charid_servos_getpos, BleGattRX);
  ble.setBleGattRxCallback(charid_servos_getzero, BleGattRX);
  return true;
}

void BLEService::update()
{
  //Serial.println(F("Update SMBlue"));
  ble.update(200);
}
