interface BleDeviceJSON {
  name:    string;
  id:     string;
}


class BleDevice {

  
  constructor(
    public name: string,
    public id:  string
  ) {
    
  }

 
  static decode(json: BleDevice): BleDevice {
    let user = Object.create(BleDevice.prototype);
    return Object.assign(user, json, {
      
    });
  }
}
