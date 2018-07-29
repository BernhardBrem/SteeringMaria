#ifndef Servo_h
#define Servo_h

// This contains one servo with all his characteristics
class Servo{
  public:
    Servo();
    static void init();
    void init(uint8_t tid);
    void setServo(uint16_t pos );
    uint16_t getServo();
    
  protected:
    uint8_t id;
    uint16_t pos;

};

#endif
