class Message {
   constructor(name, commands){
      this.name = name;
      if(!name) {
         throw Error("name required");// Write code here!
}
this.commands = commands;
}

}
module.exports = Message;