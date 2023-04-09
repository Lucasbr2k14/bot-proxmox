const axios = require("axios").default;

class Proxmox{
  constructor(objAuth){
    this.urlBase = `https://${objAuth.url}/api2/json/nodes/${objAuth.node}/qemu/${objAuth.vmId}`;
    this.proxmoxReaders = {
      Authorization: `Bearer ${objAuth.auth}`
    };
  }

  async status(){
    const url = this.urlBase + "/status/current";
    const req = await axios.get(url, { headers:this.proxmoxReaders });
    return req.data.data.qmpstatus;
  }

  async pause(){
    const url = this.urlBase + "/status/suspend";
    const req = await axios.post(url, null, { headers: this.proxmoxReaders });
    if(req.status == 200){
      return "Paused";
    }
    else{
      return "Error";
    }
  }

  async resume(){
    const url = this.urlBase + "/status/resume";
    const req = await axios.post(url, null, { headers: this.proxmoxReaders });
    if(req.status == 200){
      return "Resumed";
    }
    else{
      return "Error";
    }
  }
}

module.exports = Proxmox;
