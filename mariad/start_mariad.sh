#!/bin/sh
cd /root/SteeringMaria/mariad
export FLASK_DEBUG=1
flask run --host 0.0.0.0
