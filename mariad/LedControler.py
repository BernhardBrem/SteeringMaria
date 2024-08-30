#!/bin/python3
from time import sleep, perf_counter, monotonic
from threading import Thread,Lock
import SettingsManager

class LedControler:
    def __init__(self, pwm, settings):
        
        self.pwm=pwm
        self.on=False
        self.settings=settings
        self.brightnestime=monotonic()
        self.actualBrightnes=2500
        self.brightnesDown=True

    def changeBrightnes(self):
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



    def update(self):
        if self.settings["channel"] != -1:
            if self.on:
                #print("On!")
                #print("Set brightness to " + str(self.brightness))
                self.changeBrightnes()
                self.pwm.setServoPulse(self.settings["channel"],self.actualBrightnes)
            else:
                #print("Off!")
                self.pwm.setServoPulse(self.settings["channel"],0)



class LedControlerManager:
    def __init__(self,pwm):
        self.LedControlers={}
        self.lock=Lock()
        self.run=True
        self.pwm=pwm

    def addControler(self,name):
        prefs={
          "channel": -1,
          "brightnes": 2500,
          "brightnesspan":10,
         "brightnesfactor": 0.7
        }
        settings=SettingsManager.getSettings("/LED"+name,prefs)
        self.LedControlers[name]=LedControler(self.pwm,settings)

    def loop(self):
        while(self.run):
            #print("acquire lock")
            self.lock.acquire()
            #print("Got lock")
            for c in self.LedControlers:
                #print("Update " + c)
                self.LedControlers[c].update()
            #print("Release lock")
            self.lock.release()
            #print("Released")
            sleep(0.02)
    
    def getStatus(self,name):
        if name in self.LedControlers:
            return {"Name":name, "On":self.LedControlers[name].on}
    
    def putStatus(self,status):
        for l in status:
            if l["Name"] in self.LedControlers:
                self.LedControlers[l["Name"]].on=l["On"]


    def start(self):
       t = Thread(target=self.loop)#, args=(self,))
       t.start()
