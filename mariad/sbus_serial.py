#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
Based on:
    https://github.com/fifteenhex/python-sbus
	Sokrates80/sbus_driver_micropython git hub
	https://os.mbed.com/users/Digixx/code/SBUS-Library_16channel/file/83e415034198/FutabaSBUS/FutabaSBUS.cpp/
	https://os.mbed.com/users/Digixx/notebook/futaba-s-bus-controlled-by-mbed/
	https://www.ordinoscope.net/index.php/Electronique/Protocoles/SBUS
"""

import serial
import time

class SBUSReceiver:
    

    class SBUSFramer:

        START_BYTE = 0x0f
        END_BYTE = 0x00
        SBUS_FRAME_LEN = 25

        def __init__(self):
            self._in_frame = False
            self._frame = bytearray()
            self.last_frame=None

        def data_received(self, data):
            for b in data:
                if self._in_frame:
                    self._frame.append(b)
                    if len(self._frame) == SBUSReceiver.SBUSFramer.SBUS_FRAME_LEN:
                        decoded_frame = SBUSReceiver.SBUSFrame(self._frame)
                        # print(decoded_frame)
                        self.last_frame=decoded_frame
                        self._in_frame = False
                else:
                    if b == SBUSReceiver.SBUSFramer.START_BYTE:
                        self._in_frame = True
                        self._frame.clear()
                        self._frame.append(b)

    class SBUSFrame:
        OUT_OF_SYNC_THD = 10
        SBUS_NUM_CHANNELS = 18
        SBUS_SIGNAL_OK = 0
        SBUS_SIGNAL_LOST = 1
        SBUS_SIGNAL_FAILSAFE = 2

        def __init__(self, frame):
            self.sbusChannels = [None] * SBUSReceiver.SBUSFrame.SBUS_NUM_CHANNELS

            channel_sum = int.from_bytes(frame[1:23], byteorder="little")

            for ch in range(0, 16):
                self.sbusChannels[ch] = channel_sum & 0x7ff
                channel_sum = channel_sum >> 11

            # to be tested, No 17 & 18 channel on taranis X8R
            if (frame[23]) & 0x0001:
                self.sbusChannels[16] = 2047
            else:
                self.sbusChannels[16] = 0
            # to be tested, No 17 & 18 channel on taranis X8R
            if ((frame[23]) >> 1) & 0x0001:
                self.sbusChannels[17] = 2047
            else:
                self.sbusChannels[17] = 0

            # Failsafe
            self.failSafeStatus = SBUSReceiver.SBUSFrame.SBUS_SIGNAL_OK
            if (frame[SBUSReceiver.SBUSFramer.SBUS_FRAME_LEN - 2]) & (1 << 2):
                self.failSafeStatus = SBUSReceiver.SBUSFrame.SBUS_SIGNAL_LOST
            if (frame[SBUSReceiver.SBUSFramer.SBUS_FRAME_LEN - 2]) & (1 << 3):
                self.failSafeStatus = SBUSReceiver.SBUSFrame.SBUS_SIGNAL_FAILSAFE

        def get_rx_channels(self):
            """
            Used to retrieve the last SBUS channels values reading
            :return:  an array of 18 unsigned short elements containing 16 standard channel values + 2 digitals (ch 17 and 18)
            """

            return self.sbusChannels

        def get_rx_channel(self, num_ch):
            """
            Used to retrieve the last SBUS channel value reading for a specific channel
            :param: num_ch: the channel which to retrieve the value for
            :return:  a short value containing
            """

            return self.sbusChannels[num_ch]

        def get_failsafe_status(self):
            """
            Used to retrieve the last FAILSAFE status
            :return:  a short value containing
            """

            return self.failSafeStatus

        def __repr__(self):
            return ",".join(str(ch) for ch in self.sbusChannels)

   


    def __init__(self,serial):
        self.tserial=serial
        self.framer=SBUSReceiver.SBUSFramer()

    def read_data(self):
        if (self.tserial.inWaiting() > 0):
            # read the bytes and convert from binary array to ASCII
            try:
                data_str = self.tserial.read(self.tserial.inWaiting())
                self.framer.data_received(data_str)
            except:
                print("Read exception")

    def get_frame(self):
        return self.framer.last_frame 

    @staticmethod
    def create(port='/dev/ttySerial0'):
        serialCon=serial.Serial(port, 
            baudrate=100000, 
            bytesize=serial.EIGHTBITS, 
            parity=serial.PARITY_EVEN, 
            stopbits=serial.STOPBITS_TWO) 
        reciever = SBUSReceiver(serialCon)    
        return reciever

    

def main():
    sbus = SBUSReceiver.create("/dev/serial0")
    lastchannels=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]
    while True:
        sbus.read_data()
        frame = sbus.get_frame()
        if frame != None:
            channels=frame.get_rx_channels()
            print(f"{channels[0]} {channels[1]} {channels[2]} {channels[9]} {channels[10]} {channels[7]} {frame.failSafeStatus} ")
        #for i in range (0, len(channels)):
        #    if (i < len(lastchannels)) and (lastchannels[i] != channels[i]):
        #        print(f"{i}: {lastchannels[i]}   {channels[i]}")
        #lastchannels=channels
        time.sleep(0.01)

if __name__ == '__main__':
    main()