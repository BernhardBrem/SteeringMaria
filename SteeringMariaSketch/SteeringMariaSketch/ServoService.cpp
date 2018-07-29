#include <Arduino.h>
#include "ServoService.h"

#include "config.h"
#include "Servo.h"



Servo servos[nr_of_servos];



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
  Servo::init();
  for (int i=0; i < nr_of_servos; i++){
    servos[i].init(i);
  }
}



bool ServoService::init(){
  Serial.println(F("Init servos!"));
  
}

void ServoService::update(){
  //Serial.println(F("Update SMBlue"));
 
}

bool ServoService::setServo( uint8_t nr, uint16_t pos){
  
}
