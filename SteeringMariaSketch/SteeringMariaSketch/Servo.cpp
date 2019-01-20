#include "Adafruit_BLE.h"
#include <Adafruit_PWMServoDriver.h>
#include "Servo.h"
#include "config.h"
#include <EEPROM.h>
#include <Adafruit_PWMServoDriver.h>
//
Adafruit_PWMServoDriver pwm = Adafruit_PWMServoDriver();
//


// Wieviele Int16 muessen wir im Eprom ablegen?
#define Int16_To_Store 3

Servo::Servo(){
  this->id=0;
  this->pos=0;
  this-> leftLimit=0;
  this->rightLimit=RESOLUTION_SERVOS;
  this->zero=0;
  this->eprom_start=SERVOS_EEPROM_START;
}

void Servo::init(uint8_t tid){
  this->id=tid;
  this->eprom_start=SERVOS_EEPROM_START + this->id*Int16_To_Store*2;
  EEPROM.get(eprom_start, this->zero);
  EEPROM.get(eprom_start+2, this->leftLimit);
  EEPROM.get(eprom_start+4, this->rightLimit);
  
  
}

static void Servo::init(){
  Serial.println(F("Initialize pwm!"));
  pwm.setPWMFreq(60);  // Analog servos run at ~60 Hz updates
  pwm.begin();
}

void Servo::setPos(uint16_t pos){
  Serial.println(F("Setting servo nr. "));
  Serial.println(this->id);
  Serial.println(F(" to position "));
  Serial.println(pos);  
  this->pos=pos;
  pwm.setPWM(this->id, 0,pos);
 };

uint16_t Servo::getPos(){
  return this->pos;
}


bool Servo::setZero( uint16_t pos){
  this->zero=pos;
  EEPROM.put(eprom_start, this->zero);
  
}


bool Servo::setLeftLimit( uint16_t pos){
  this->leftLimit=pos;
  EEPROM.put(eprom_start+2, this->leftLimit);
}

bool Servo::setRightLimit(uint16_t pos){
  this->rightLimit=pos;;
   EEPROM.put(eprom_start+4, this->rightLimit);
}


uint16_t Servo::getZero(){
  return this->zero;
}
    

uint16_t Servo::getLeftLimit( ){
  return this->leftLimit;
}

uint16_t Servo::getRightLimit(){
  return this->rightLimit;;
}

