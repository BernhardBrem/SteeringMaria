#include <Arduino.h>
#include "ServoService.h"

#include "config.h"
#include "Servo.h"



Servo servos[NR_OF_SERVOS];



ServoService * ServoService::instance = 0;
ServoService * ServoService::getInstance()
{
    if (instance == 0)
    {
        instance = new ServoService();
        Serial.println("Create ServoService Singelton\n");
    }

    return instance;
}


// The constructor; it is protected since we have a singleton 
ServoService::ServoService(){
}



bool ServoService::init(){
  Serial.println(F("Init servos!"));
  Servo::init();
  for (uint8_t i=0; i < NR_OF_SERVOS; i++){
    //Serial.println(F("Init servo") );
    //Serial.println(i);
    servos[i].init(i);
  }
  
}

void ServoService::update(){
  //Serial.println(F("Update SMBlue"));
 
}

bool ServoService::setPos( uint8_t nr, uint16_t pos){
  //Serial.println(nr);
  servos[nr].setPos(pos);
  
}


uint16_t ServoService::getPos( uint8_t nr){
  //Serial.println(nr);
  return servos[nr].getPos();
  
}

bool ServoService::setLeftLimit( uint8_t nr, uint16_t pos){
  //Serial.println(nr);
  servos[nr].setLeftLimit(pos);  
}

bool ServoService::setRightLimit( uint8_t nr, uint16_t pos){
  //Serial.println(nr);
  servos[nr].setRightLimit(pos);  
}

bool ServoService::setZero( uint8_t nr, uint16_t pos){
  //Serial.println(nr);
  servos[nr].setZero(pos);  
}

uint16_t ServoService::getLeftLimit(uint8_t nr){
  //Serial.println(nr);
  return servos[nr].getLeftLimit();  
}

uint16_t ServoService::getRightLimit(uint8_t nr){
  //Serial.println(nr);
  return servos[nr].getRightLimit();  
}

uint16_t ServoService::getZero(uint8_t nr){
  Serial.println(F("Return zero"));
  Serial.println(nr);
  return servos[nr].getZero();  
}
