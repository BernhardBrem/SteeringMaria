import LedControler
from RCManager import RCManager
from LedControler import LedControlerManager
from PWMManager import PwmManager
from SettingsManager import SettingsManager
import time



# Idea behind that class: To keep as far as possible the other classes generical. Wire up the different 
# modules in this one class

# Channels used by RC. TODO: Make this configurable
MOTORCHANNEL=0
RUDDERCHANNEL=1
SAILCHANNEL=2
LIGHT1CHANNEL=9
LIGHT2CHANNEL=10
LIGHT1OFF=172
LIGHT1ON1=992
LIGHT1ON2=1811
LIGHT2OFF=172
LIGHT2ON=1811
LEDNAMES=["Steuerboard","Backboard","Mastlicht","Kompass","Unterdeck"]


def switch_off_position_and_ship_lights():
    status=[
       {
         'Name' : "Steuerboard",
         'On'   : False
       },
       {
         'Name' : "Backboard",
         'On'   : False
       },
       {
         'Name' : "Unterdeck",
         'On'   : False
       },
       {
         'Name' : "Kompass",
         'On'   : False
       }
    ]
    LedControlerManager.putStatus(status)


def switch_on_position_lights():
    status=[
       {
         'Name' : "Steuerboard",
         'On'   : True
       },
       {
         'Name' : "Backboard",
         'On'   : True
       },
       {
         'Name' : "Unterdeck",
         'On'   : False
       },
       {
         'Name' : "Kompass",
         'On'   : False
       }
    ]
    LedControlerManager.putStatus(status)


def switch_on_position_and_ship_lights():
    status=[
       {
         'Name' : "Steuerboard",
         'On'   : True
       },
       {
         'Name' : "Backboard",
         'On'   : True
       },
       {
         'Name' : "Unterdeck",
         'On'   : True
       },
       {
         'Name' : "Kompass",
         'On'   : True
       }
    ]
    LedControlerManager.putStatus(status)

def switch_on_top_light():
    status=[
       {
         'Name' : "Mastlicht",
         'On'   : True
       }]
    LedControlerManager.putStatus(status)

def switch_off_top_light():
    status=[
       {
         'Name' : "Mastlicht",
         'On'   : False
       }]
    LedControlerManager.putStatus(status)


def wireUp():
    global LEDNAMES
    print("Starting pammanager")
    PwmManager.start()
    print("Starting settingsmanager")
    SettingsManager.start()
    print("Starting LED")
    LedControlerManager.start()
    print("Starting RC")
    RCManager.start()
    print("All started, configuring")
    for name in LEDNAMES:
        LedControlerManager.addControler(name)
    RCManager.addToChannelMap(LIGHT1CHANNEL,LIGHT1OFF,switch_off_position_and_ship_lights)
    RCManager.addToChannelMap(LIGHT1CHANNEL,LIGHT1ON1,switch_on_position_lights)
    RCManager.addToChannelMap(LIGHT1CHANNEL,LIGHT1ON2,switch_on_position_and_ship_lights)
    RCManager.addToChannelMap(LIGHT2CHANNEL,LIGHT2OFF,switch_off_top_light)
    RCManager.addToChannelMap(LIGHT2CHANNEL,LIGHT2ON,switch_on_top_light)
    

def tearDown():
  RCManager.stop()
  LedControlerManager.stop()
  SettingsManager.stop()
  PwmManager.stop()

def stop(sig, frame):
    print("Tearing down")
    tearDown()
    #print("Sleeping to allow tear down")
    #time.sleep(10)
    print("Exit")
    exit()
