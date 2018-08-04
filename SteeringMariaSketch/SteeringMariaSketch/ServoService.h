#ifndef ServoService_h
#define ServoService_h




class ServoService{
  
  // Singelton design pattern - this instance can exist only once!
  public: 
    
    static ServoService* getInstance();
    void update();
    bool init();
    bool setServo( uint8_t nr, uint16_t pos);
    uint16_t getServo( uint8_t nr);
    bool setLeftLimit( uint8_t nr, uint16_t pos);
    bool setRightLimit( uint8_t nr, uint16_t pos);
    bool setZero( uint8_t nr, uint16_t pos);
    uint16_t getLeftLimit( uint8_t nr);
    uint16_t getRightLimit( uint8_t nr);
    uint16_t getZero( uint8_t nr);
    

  protected:
     ServoService();
     static ServoService* instance;
     

     
};


#endif

