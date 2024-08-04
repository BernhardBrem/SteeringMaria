import PCA9685 
import LedControler
from time import sleep

PWM = PCA9685.PCA9685(0x40, debug=False)
PWM.setPWMFreq(50)

Steuerboard=LedControler.LedControler(PWM,1)
Backboard=LedControler.LedControler(PWM,0)
Steuerboard.brightnes=500

ledManager=LedControler.LedControlerManager()
ledManager.addControler("Steuerboard",Steuerboard)
ledManager.addControler("Backboard",Backboard)
ledManager.start()

while(True):
  print("Steuerboard on")
  Steuerboard.on=True
  sleep(10)
  print("Steuerboard off")
  Steuerboard.on=False
  sleep(10)
  print("Backboard on")
  Backboard.on=True
  sleep(10)
  print("Backboard off")
  Backboard.on=False


