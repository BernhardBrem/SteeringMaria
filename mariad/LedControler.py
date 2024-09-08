#!/bin/python3
from time import sleep, perf_counter, monotonic
from threading import Thread,Lock
import SettingsManager
import random

class LedControler:
    def __init__(self, pwm, settings):
        
        self.pwm=pwm
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
            if (t > self.flickrtime + self.settings["brightnesspan"]): # Start flickring
                if self.flickrplan=={}:
                    # Calculate flickr events with random nrs
                    nrOfFlicks=random.randint(1,10)
                    ti=t
                    for i in range(1,nrOfFlicks):
                        ti=ti+random.random()*0.75 # A fraction shorter than 0.75 seconds
                        tv=random.random()
                        self.flickrplan[ti]=tv
                # Search the according time in the flickr plan
                last=False
                for tx in self.flickrplan:
                    if t < tx:
                        self.actualBrightnes=self.actualBrightnes*self.flickrplan[tx]
                if t >= tx:
                    self.flickrplan={}
                    self.flickrtime=t
                   





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
        self.prefs={
          "channel":           -1,
          "brightnes":         2500,
          "brightnesspan":     100,
          "brightnesfactor":   0.7,
          "flickrspan":        150,
        }

    def addControler(self,name):
        
        settings=SettingsManager.getSettings("/LED/"+name,self.prefs)
        self.LedControlers[name]=LedControler(self.pwm,settings)

    def loop(self):
        while(self.run):
            #print("acquire lock")
            #self.lock.acquire()
            #print("Got lock")
            for c in self.LedControlers:
                #print("Update " + c)
                self.LedControlers[c].update()
            #print("Release lock")
            #self.lock.release()
            #print("Released")
            sleep(0.02)
    
    def getStatus(self,name):
        if name in self.LedControlers:
            return {"Name":name, "On":self.LedControlers[name].on}

    def getSettings(self):
        result={}
        for name in self.LedControlers:        
            result[name]=SettingsManager.getSettings("/LED/"+name,self.prefs)
        return result
    
    def putStatus(self,status):
        for l in status:
            if l["Name"] in self.LedControlers:
                self.LedControlers[l["Name"]].on=l["On"]

    def putSetting(self,name,setting):
        if name in self.LedControlers:
            self.LedControlers[name].settings=setting
            SettingsManager.setSetting("/LED/"+name,setting)
    


    def start(self):
       t = Thread(target=self.loop)#, args=(self,))
       t.start()
