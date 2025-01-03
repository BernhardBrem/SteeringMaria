import flask 
import json
import serial
import Maria
import signal
from LedControler import LedControlerManager

##########################################################################
# Since we have a flask application, this is the entry class 
# of the application which runs the flask mainloop and responds to the web.
#
# The loops of all other functionality is started in the Maria module
###########################################################################


from flask import request
Maria.wireUp()
# We handle the signals ourself to stop the working threads
signal.signal(signal.SIGINT, Maria.stop)
signal.signal(signal.SIGTERM, Maria.stop)

app = flask.Flask(__name__)
# Servo board


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
   ledNames=Maria.LEDNAMES
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

if __name__ == '__main__':
    app.run(threaded=False,host="0.0.0.0")
   

