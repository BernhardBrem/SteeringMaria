import sbus_serial
from threading import Thread
import queue
import time

class RCManager():
    
    inputQueue=queue.Queue()

    def __init__(self):
        self.__lastchannels__=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        self.__channelMap__=[]
        self.__stop__=False
        self.sbus=sbus_serial.SBUSReceiver.create("/dev/serial0")

    def handle_sbus(self):
        self.sbus.read_data()
        frame = self.sbus.get_frame()
        #print("Have frame")
        if frame != None and frame.failSafeStatus == 0:
            channels=frame.get_rx_channels()
            #print(channels)
            for [channel, value, command ] in self.__channelMap__:
                for i in range(0,len(channels)):
                    if channel == i:
                        if (channels[i] != self.__lastchannels__[i]):
                            if channels[i] == value:
                                print(f"XXX{channels[i]} {self.__lastchannels__[i]}XXX")
                                print("!!!!!")
                                print(command)
                                command()
            self.__lastchannels__=channels
        
    def loop(self):
        while not self.__stop__:
            self.handle_sbus()
            try:
                command=RCManager.inputQueue.get(False)
            except: 
                command=None
            # Handle commands if any
            if command != None:
                commandType=command[0]
                if commandType=="stop":
                    self.__stop__ = True
                if commandType=="addToChannelMap":
                    [commandType,channel,value,command]=command
                    self.__addToChannelMap__(channel,value,command)
            time.sleep(0.01)
        print("Stop RCManager")       

        #print(f"{channels[0]} {channels[1]} {channels[5]}")

    def __addToChannelMap__(self,channel,value,command):
        self.__channelMap__.append([channel,value,command])

    @staticmethod
    def addToChannelMap(channel,value,command):
        RCManager.inputQueue.put(["addToChannelMap",channel,value,command])

    @staticmethod
    def start():
        global workthread
        workthread = Thread(target=RCManager().loop)
        workthread.start()

    @staticmethod
    def stop():
        RCManager.inputQueue.put(["stop"])
        global workthread
        workthread.join()
        print("RCManager stopped")