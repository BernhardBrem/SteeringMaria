import flask 
import json
import PCA9685 
import LedControler
import serial
from flask import request
app = flask.Flask(__name__)
# Servo board
PWM = PCA9685.PCA9685(0x40, debug=False)
PWM.setPWMFreq(50)

ledNames=["Steuerboard","Backboard","Mast"]

ledManager=LedControler.LedControlerManager(PWM)
for name in ledNames:
   ledManager.addControler(name)
ledManager.start()

def respond(o):
   resp=flask.Response(json.dumps(o))
   resp.headers['Content-Type']='application/json'
   return resp

@app.route("/")
def hello_world():
   return respond(["Hello","World"])
    
@app.route("/LED/Status", methods=['GET', 'POST','PUT'])
def LedStatus():
   print(f"YYYY{request}")
   if request.method == 'POST'or request.method == 'PUT':
      allLedStatus=json.loads(request.get_json())
      print(allLedStatus)
      ledManager.putStatus(allLedStatus)
   result=[]
   for l in ledNames:
      result.append(ledManager.getStatus(l))
   return respond(result)

