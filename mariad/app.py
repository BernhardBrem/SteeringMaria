import flask 
import json

import LedControler
from LedControler import LedControlerManager
from PWMManager import PwmManager
from SettingsManager import SettingsManager
import serial
from flask import request
app = flask.Flask(__name__)
# Servo board


ledNames=["Steuerboard","Backboard","Mast"]
PwmManager.start()
SettingsManager.start()
LedControlerManager.start()

for name in ledNames:
   LedControlerManager.addControler(name)

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
      allLedStatus=request.get_json()
      print(allLedStatus)
      LedControlerManager.putStatus(allLedStatus)
   result=[]
   for l in ledNames:
      result.append(LedControlerManager.getStatus(l))
   return respond(result)

@app.route("/LED/Settings", methods=['GET','PUT','POST'])
def LedSettings():
   print(f"YYYY{request}")
   result=LedControlerManager.getSettings()
   return respond(result)
 
@app.route("/LED/Settings/<name>", methods=['PUT','POST'])
def PutLedSettings(name):
   tjson=request.get_json()
   print(f"{request} {tjson}")
   LedControlerManager.putSetting(name,tjson)
   return respond(True)
   #result=ledManager.getSettings()
   #return respond(result)
