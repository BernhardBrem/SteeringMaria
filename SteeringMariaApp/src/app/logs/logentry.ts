
export class Logentry {
  date: Date;
  message: string;
  
  constructor(msg: string){
      this.date = new Date();
      this.message=msg;
  }
}