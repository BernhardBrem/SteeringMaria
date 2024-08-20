#!/bin/python3
from time import sleep, perf_counter, monotonic
from threading import Thread,Lock
import random

class LedControler:
    def __init__(self, pwm, channel):
        self.channel=channel
        self.pwm=pwm
        self.on=False
        self.brightnes=2500
        self.brightnesspan=5+2*random.random()
        self.brightnesfactor=0.7
        self.brightnestime=monotonic()
        self.actualBrightnes=2500
        self.brightnesDown=True

    def changeBrightnes(self):
        t=monotonic()
        startBrightnes=self.brightnes
        if (t < self.brightnestime + self.brightnesspan):
            delta=t-self.brightnestime
            factor = self.brightnesfactor*(delta/self.brightnesspan)
            if self.brightnesDown:
                self.actualBrightnes=self.brightnes - factor*self.brightnes
                #print(self.actualBrightnes)
            else:
                self.actualBrightnes=self.brightnes - self.brightnesfactor*self.brightnes + factor*self.brightnes
        else:
            # Change the direction
            self.brightnesDown = not(self.brightnesDown)
            print("Direction:" +str(self.brightnesDown))
            self.brightnestime=t



    def update(self):
        if self.on:
            #print("On!")
            #print("Set brightness to " + str(self.brightness))
            self.changeBrightnes()
            self.pwm.setServoPulse(self.channel,self.actualBrightnes)
        else:
            #print("Off!")
            self.pwm.setServoPulse(self.channel,0)



class LedControlerManager:
    def __init__(self):
        self.LedControlers={}
        self.lock=Lock()
        self.run=True

    def addControler(self,name,controler):
        self.LedControlers[name]=controler

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

    def start(self):
       t = Thread(target=self.loop)#, args=(self,))
       t.start()
