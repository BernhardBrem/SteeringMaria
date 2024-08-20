import PCA9685 
import LedControler
import serial

from time import sleep

PWM = PCA9685.PCA9685(0x40, debug=False)
PWM.setPWMFreq(50)

Steuerboard=LedControler.LedControler(PWM,1)
Backboard=LedControler.LedControler(PWM,0)
Steuerboard.brightnes=200
Backboard.brightnes=1000

Mast=LedControler.LedControler(PWM,3)
Mast.brightnes=3000
Mast.brightnesfactor=0.9

ledManager=LedControler.LedControlerManager()
ledManager.addControler("Steuerboard",Steuerboard)
ledManager.addControler("Backboard",Backboard)
ledManager.addControler("Mast",Mast)
ledManager.start()

while(True):
  print("Mast on")
  Mast.on=True
  print("Steuerboard on")
  Steuerboard.on=True
  print("Backboard on!")
  Backboard.on=True
  sleep(60)
  print("Steuerboard off")
  Steuerboard.on=False
  print("Backboard off")
  Backboard.on=False
  sleep(5)
  print("Mast off")
  Mast.off=True
  sleep(5)

