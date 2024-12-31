#!/bin/python3
from time import sleep, perf_counter, monotonic
import SettingsManager
import random
import queue
from PWMManager import PwmManager
from SettingsManager import SettingsManager 
from threading import Thread

workthread=None
updatethread=None

class LedControler:
    def __init__(self,  settings):
        self.on=False
        self.settings=settings
        self.brightnestime=monotonic()
        self.flickrtime=monotonic()
        self.actualBrightnes=2500
        self.brightnesDown=True
        self.flickrplan={}
        

    def changeBrightnes(self):
        if self.settings["brightnesspan"] > 5:
            t=monotonic()
            startBrightnes=self.settings["brightnes"]
            if (t < self.brightnestime + self.settings["brightnesspan"]):
                delta=t-self.brightnestime
                factor = self.settings["brightnesfactor"]*(delta/self.settings["brightnesspan"])
                if self.brightnesDown:
                    self.actualBrightnes=self.settings["brightnes"] - factor*self.settings["brightnes"]
                    #print(self.actualBrightnes)
                else:
                    self.actualBrightnes=self.settings["brightnes"] - self.settings["brightnesfactor"]*self.settings["brightnes"] + factor*self.settings["brightnes"]
            else:
                # Change the direction
                self.brightnesDown = not(self.brightnesDown)
                print("Direction:" +str(self.brightnesDown))
                self.brightnestime=t
        else: # We interprete numbers < 5 as off
            self.actualBrightnes=self.settings["brightnes"]

    def changeFlickr(self):
        if self.settings["flickrspan"] > 5:
            t=monotonic()
            if (t > self.flickrtime + self.settings["flickrspan"]): # Start flickring
                if self.flickrplan=={}:
                    # Calculate flickr events with random nrs
                    nrOfFlicks=random.randint(1,40)
                    print(f"Flickring {nrOfFlicks} on chan {self.settings['channel']}")
                    ti=t
                    bright=False
                    for i in range(1,nrOfFlicks):
                        ti=ti+random.random()*0.5 # A fraction shorter than 1 seconds
                        if bright:
                            tv=1-random.random()*0.2
                            bright=False
                        else:
                            tv=random.random()*0.5
                            bright=True
                        self.flickrplan[ti]=tv
                # Search the according time in the flickr plan
                lasttx=0
                txToSet=0
                for tx in self.flickrplan:
                    if t > lasttx and t <=tx:
                        txToSet=tx
                    lasttx=tx
                if txToSet != 0:
                    self.actualBrightnes=self.actualBrightnes*self.flickrplan[txToSet]
                    #print(f"t {t} tx {txToSet} b {self.actualBrightnes}")
                if t >= lasttx:
                    self.flickrplan={}
                    self.flickrtime=t
                    print("End flickr")

    def update(self):
        #print(self.settings)
        if self.settings["channel"] != -1:
            if self.on:
                #print("On!")
                #print("Set brightness to " + str(self.brightness))
                self.changeBrightnes()
                self.changeFlickr()
                PwmManager.setPWM(self.settings["channel"],0,int(self.actualBrightnes))
            else:
                #print("Off!")
                PwmManager.setPWM(self.settings["channel"],0,0)



class LedControlerManager:
    inputQueue=queue.Queue()
    outputStatusQueue=queue.Queue()
    outputSettingsQueue=queue.Queue()
    updateQueue=queue.Queue()


    def __init__(self):
        self.LedControlers={}
        self.run=True
        self.update=True
        self.prefs={
          "channel":           -1,
          "brightnes":         2500,
          "brightnesspan":     100,
          "brightnesfactor":   0.7,
          "flickrspan":        150,
        }
        
    
    def loop(self):
        while(self.run):
            command,data=LedControlerManager.inputQueue.get()
            if command != "update":
                print("Got command " + command)
            if command == "getStatus":
                LedControlerManager.outputStatusQueue.put(self.__getStatus__(data))
            if command == "getSettings":
                LedControlerManager.outputSettingsQueue.put(self.__getSettings__())
            if command == "putStatus":
                self.__putStatus__(data)
            if command == "putSettings":
                name,setting=data
                self.__putSetting__(name,setting)
            if command == "addControler":
                self.__addControler__(data)
            if command == "update":
                for c in self.LedControlers:
                    self.LedControlers[c].update()
            if command == "stop":
                print("Stopping LEDManager Mainloop")
                self.run=False
        print("Stop mainloop LEDManager")

    @staticmethod
    def addControler(name):
        LedControlerManager.inputQueue.put(["addControler",name])

    def __addControler__(self,name):        
        settings=SettingsManager.getSettings("/LED/"+name,self.prefs)
        self.LedControlers[name]=LedControler(settings)
        
    
    @staticmethod
    def getStatus(name):
        LedControlerManager.inputQueue.put(["getStatus",name])
        return LedControlerManager.outputStatusQueue.get()

    def __getStatus__(self,name):
        if name in self.LedControlers:
            return {"Name":name, "On":self.LedControlers[name].on}

    @staticmethod
    def getSettings():
        LedControlerManager.inputQueue.put(["getSettings",""])
        print("Requesting settings, putting request in queue")
        return LedControlerManager.outputSettingsQueue.get()

    def __getSettings__(self):
        result={}
        for name in self.LedControlers:        
            result[name]=SettingsManager.getSettings("/LED/"+name,self.prefs)
        return result
    
    @staticmethod
    def putStatus(status):
        LedControlerManager.inputQueue.put(["putStatus",status])

    def __putStatus__(self,status):
        for l in status:
            print("PutStatus")
            if l["Name"] in self.LedControlers:
                print(f"{l['Name']} {l['On']}")
                self.LedControlers[l["Name"]].on=l["On"]
    
    @staticmethod
    def putSetting(name,setting):
        LedControlerManager.inputQueue.put(["putSettings",[name,setting]])

    def __putSetting__(self,name,setting):
        if name in self.LedControlers:
            self.LedControlers[name].settings=setting
            SettingsManager.setSetting("/LED/"+name,setting)
    
    def triggerUpdate(self):
        while(self.update):
            try:
                command=LedControlerManager.updateQueue.get(False)
                if (command=="stop"):
                    self.update=False
            except:
                pass
            LedControlerManager.inputQueue.put(["update",""])
            sleep(0.05)
            #sleep(2)
        print("Stop update ledmanager")

    @staticmethod
    def start():
        global workthread
        global updatethread
        workthread = Thread(target=LedControlerManager().loop)#, args=(self,))
        workthread.start()
        updatethread = Thread(target=LedControlerManager().triggerUpdate)#, args=(self,))
        updatethread.start()
    
    @staticmethod
    def stop():
        LedControlerManager.inputQueue.put(["stop",""])
        LedControlerManager.updateQueue.put("stop")
        global workthread
        global updatethread
        workthread.join()
        print("Stopped ledmanager work thread")
        updatethread.join()
        print("Stopped ledmanager update thread")
        