#!/bin/python3
from time import sleep, perf_counter
from threading import Thread,Lock

class LedControler:
    def __init__(self, pwm, channel):
        self.channel=channel
        self.pwm=pwm
        self.on=False
        self.brightnes=2500

    def update(self):
        if self.on:
            #print("On!")
            #print("Set brightness to " + str(self.brightness))
            self.pwm.setServoPulse(self.channel,self.brightnes)
        else:
            #print("Off!")
            self.pwm.setServoPulse(self.channel,0)


class LedControlerManager:
    def __init__(self):
        self.LedControlers={}
        self.lock=Lock()

    def addControler(self,name,controler):
        self.LedControlers[name]=controler

    def loop(self):
        while(True):
            #print("acquire lock")
            self.lock.acquire()
            #print("Got lock")
            for c in self.LedControlers:
                #print("Update " + c)
                self.LedControlers[c].update()
            #print("Release lock")
            self.lock.release()
            #print("Released")
            sleep(0.5)

    def start(self):
       t = Thread(target=self.loop)#, args=(self,))
       t.start()
