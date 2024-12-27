import sbus_rx.py
import async
class RCManager:
    lastchannels=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    

@staticmethod    
async def main(channelMap):
    sbus = await sbus_rx.SBUSReceiver.create("/dev/serial0")
    while True:
        frame = await sbus.get_frame()
        channels=frame.get_rx_channels()
        for i in range(0,channels):
            if (channels[i] != self.lastchannels[i]):
                for [channel, inputQ, command ] in channelMap:
                    inputQ.put([command,channel[i]])

        #print(f"{channels[0]} {channels[1]} {channels[5]}")

def addToChannelMap(channel,inputQueue,command):
    self.channelMap.append(channel,inputQueue,command)

def start():
    async.run(main(self.channelMap))
