#include <Arduino.h>
#include "ServoService.h"
#include "config.h"



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
  //Serial.println(F("Constructor SMBlue"));
}



bool ServoService::init(){
  Serial.println(F("Init servos!"));
  
}

void ServoService::update(){
  //Serial.println(F("Update SMBlue"));
 
}

bool ServoService::setServo( uint8_t nr, uint16_t pos){
  Serial.println(F("Setting servo nr. "));
  Serial.println(nr);
  Serial.println(F(" to position "));
  Serial.println(pos);  
}
