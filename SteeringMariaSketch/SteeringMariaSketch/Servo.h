#ifndef Servo_h
#define Servo_h

// This contains one servo with all his characteristics
class Servo{
  public:
    Servo();
    static void init();
    void init(uint8_t tid);
    void setPos(uint16_t pos );
    uint16_t getPos();
    bool setLeftLimit( uint16_t pos);
    bool setRightLimit(uint16_t pos);
    bool setZero( uint16_t pos);
    uint16_t getLeftLimit();
    uint16_t getRightLimit();
    uint16_t getZero();
    
  protected:
    uint8_t id;
    uint16_t pos;
    uint16_t leftLimit;
    uint16_t rightLimit;
    uint16_t zero;
    int eprom_start;
};

#endif
