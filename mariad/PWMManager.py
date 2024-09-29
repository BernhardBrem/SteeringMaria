import PCA9685
import queue
from threading import Thread


PWM = PCA9685.PCA9685(0x40, debug=False)
PWM.setPWMFreq(50)

class PwmManager:
    inputQueue=queue.Queue()
    

    def __init__(self):
        self.pwm = PCA9685.PCA9685(0x40, debug=False)
        self.pwm.setPWMFreq(50)
        self.run=True
    
    @staticmethod
    def setPWM(channel, start, end):
        PwmManager.inputQueue.put(["setPWM",[channel,start,end]])

    def __setPWM__(self, channel,start,end):
        self.pwm.setPWM(channel,start,end)
    
    @staticmethod
    def setServoPulse(channel,pulse):
        PwmManager.inputQueue.put(["setServoPulse",[channel,pulse]])

    def __setServoPulse__(self,channel,pulse):
        self.pwm.setServoPulse(channel,pulse)

    def loop(self):
        while(self.run):
            command,data=PwmManager.inputQueue.get()
            if command == "setPWM":
                channel,start,end=data
                self.__setPWM__(channel,start,end)
            if command == "setServoPulse":
                channel,pulse=data
                self.__setServoPulse__(channel,pulse)
    
    @staticmethod
    def start():
        workthread = Thread(target=PwmManager().loop)#, args=(self,))
        workthread.start()
    

