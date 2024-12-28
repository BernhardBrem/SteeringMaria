import rx
import asyncio

__lastchannels__=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
__channelMap__=[]

async def __main__(channelMap):
    global __lastchannels__
    sbus = await rx.SBUSReceiver.create("/dev/serial0")
    #sbus = await rx.SBUSReceiver.create("/dev/ttyAMA0")
    while True:
        frame = await sbus.get_frame()
        if frame.failSafeStatus == 0:
            channels=frame.get_rx_channels()
            #print(channels)
            for i in range(0,len(channels)):
                if (channels[i] != __lastchannels__[i]):
                    for [channel, value, command ] in channelMap:
                        if channel == i:
                            if channels[i] == value:
                                command()
            __lastchannels__=channels
                    

        #print(f"{channels[0]} {channels[1]} {channels[5]}")

def addToChannelMap(channel,value,command):
    __channelMap__.append([channel,value,command])

def start():
    asyncio.run(__main__(__channelMap__))
