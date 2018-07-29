#ifndef ServoService_h
#define ServoService_h



class ServoService{
  
  // Singelton design pattern - this instance can exist only once!
  public: 
    
    static ServoService* getInstance();
    void update();
    bool init();
    bool setServo( uint8_t nr, uint16_t pos);

  protected:
     ServoService();
     static ServoService* instance;

     
};


#endif

