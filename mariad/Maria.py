import LedControler
from LedControler import LedControlerManager
from PWMManager import PwmManager
from SettingsManager import SettingsManager

# Idea behind that class: To keep as far as possible the other classes generical. Wire up the different 
# modules in this one class

def wireUp()
    ledNames=["Steuerboard","Backboard","Mastlicht","Kommass","Unterdeck"]
    PwmManager.start()
    SettingsManager.start()
    LedControlerManager.start()
    for name in ledNames:
        LedControlerManager.addControler(name)





