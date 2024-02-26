const Message = require('./message.js');
const Command = require('./command.js');

class Rover {
   constructor(position) {
      this.position = position;
      this.mode = 'NORMAL';
      this.generatorWatts = 110;// Write code here!
}

receiveMessage(message) {
   let response = {
      message: message.name,
      results: [],
   
};

for(let command of message.commands){
   let result = {};
  
   if(command.commandType === 'STATUS_CHECK') {
      // result = {
         result.roverStatus = {
            mode: this.mode, generatorWatts: this.generatorWatts, position: this.position
         };

   } else if (command.commandType === 'MODE_CHANGE') {
      this.mode = command.value;
      result.completed = true; 
  
   } else if (command.commandType === 'MOVE') {
      // let result = {};
      if(this.mode === "LOW_POWER") {
         result.completed = false;
         // result = {completed: false, message: "Can’t be moved in this state" };
      } else {
         this.position = command.value;
         result.completed = true;
      //    if (result.completed) {
      // result.roverStatus = { 
      //    // completed: true, roverStatus: {
      //    mode: this.mode, generatorWatts: this.generatorWatts, position: this.position
      // }}};
      // }//check this line of code
      };
   }
response.results.push(result)
}


return response;
}


}
   
  
  


   
   
module.exports = Rover;

// let rover = new Rover(100);
// let commands = [
//    new Command('MOVE', 4321),
//    new Command('STATUS_CHECK'),
//    new Command('MODE_CHANGE', 'LOW_POWER'),
//    new Command('MOVE', 3579), //this should be false
//    new Command('STATUS_CHECK')
// ];
// let message = new Message('TA power', commands);
// let response = rover.receiveMessage(message);

// console.log(rover)
// console.log("/////////")
// // console.log(response)
// console.log(JSON.stringify(response, null, 2));
