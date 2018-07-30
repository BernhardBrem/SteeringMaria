#include <Adafruit_PWMServoDriver.h>
#include "Servo.h"
//#include <Adafruit_PWMServoDriver.h>
//
//Adafruit_PWMServoDriver pwm = Adafruit_PWMServoDriver();
//

Servo::Servo(){
  this->id=0;
  this->pos=0;
}

void Servo::init(uint8_t tid){
  this->id=tid;
}

static void Servo::init(){
  //pwm.setPWMFreq(60);  // Analog servos run at ~60 Hz updates
  //pwm.begin();
}

void Servo::setServo(uint16_t pos){
  Serial.println(F("Setting servo nr. "));
  Serial.println(this->id);
  Serial.println(F(" to position "));
  Serial.println(pos);  
  this->pos=pos;
  //pwm.setPWM(this->id, 0,pos);
 };

uint16_t Servo::getServo(){
  return this->pos;
}

