import json
import os
from threading import Thread
import queue


class SettingsManager:
    inputQueue=queue.Queue()
    filepath="./settings.json"
    getSettingsQueue=queue.Queue()
   

    def __init__(self):
        self.currentSettings={}
        self.readSettingsFromFile()
        self.run=True

    def readSettingsFromFile(self):
        if os.path.isfile(SettingsManager.filepath):
            try:
                with open(SettingsManager.filepath,"rt" ) as fl:
                    self.currentSettings= json.load(fl)
            except:
                self.currentSettings={}

        

    @staticmethod
    def getSettings(path,prefs):
        SettingsManager.inputQueue.put(["getSettings",[path,prefs]])
        return SettingsManager.getSettingsQueue.get()

    def __getSettings__(self,path,prefs):
        if path not in self.currentSettings:
            self.currentSettings[path]=prefs
            self.store()
        SettingsManager.getSettingsQueue.put(self.currentSettings[path])

    @staticmethod
    def setSetting(path,setting):
        SettingsManager.inputQueue.put(["setSetting",[path,setting]])

    def __setSetting__(self,path,setting):
        self.currentSettings[path]=setting
        self.store()

    def store(self):
        with open(SettingsManager.filepath,"wt" ) as fl:
            json.dump(self.currentSettings,fl)
    
    def loop(self):
        while(self.run):
            command,data=SettingsManager.inputQueue.get()
            if command == "getSettings":
                path,prefs=data
                self.__getSettings__(path,prefs)
            if command == "setSetting":
                path,settings=data
                self.__setSetting__(path,settings)

    @staticmethod
    def start():
        workthread = Thread(target=SettingsManager().loop)#, args=(self,))
        workthread.start()
    
