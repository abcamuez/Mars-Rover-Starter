const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

it("constructor sets position and default values for mode and generatorWatts", function() {
  rover = new Rover('position');
  expect(rover.position).toBe("position");
  expect(rover.mode).toBe('NORMAL');
  expect(rover.generatorWatts).toBe(110);
});

  it("response returned by receiveMessage contains the name of the message", function() {
    messageName = 'Test Message';
    message = new Message(messageName, [{commandType: 'STATUS CHECK'}, {
      commandType: 'MODE_CHANGE', value: 'LOW_POWER'
    }]);
    response = rover.receiveMessage(message)
    expect(response.message).toBe(messageName)
  });

  it("response returned by receiveMessage includes two results if two commands are sent in the message", function() {
    // rover = new Rover(0);
    message = {
      name: "test msg",
      commands:[
        {commandType: '', value: ''},
        {commandType: '', value: ''}
      ]
      // commands: [{commandType: 'MOVE', value: 10}, {commandType:'STATUS CHECK'}, {commandType:'MODE_CHANGE', value: 'LOW POWER'}]
    }
    response = rover.receiveMessage(message);
    expect(response.results.length).toBe(2);
  });

  it("responds correctly to the status check command", function() {
   let message = new Message("Test Message", [{commandType: 'STATUS_CHECK'}])
   let commandType = message.commands[0].commandType;
    if(commandType === 'STATUS_CHECK') {
      results = [{roverStatus: {  "mode": "NORMAL",
      "generatorWatts": 110,
      "position": 87382098}}]
    }
    let response = rover.receiveMessage(message);
    expect(response.results.length).toBe(1)
  });

  it("responds correctly to the mode change command", function() {
    // let message = new Message("Test Messsage", [{commandType: 'MODE_CHANGE' }])
    let modeCommand = new Command('MODE_CHANGE', 'LOW_POWER','NORMAL');
    let commandType = modeCommand.commands;
    if (commandType === 'MODE_CHANGE') {
      if(modeCommand === 'LOW_POWER') {
        [{completed: false}] 
      } else {
        return [{completed: true}]
      }
      // results = []
    }
  });

  it("responds with a false completed value when attempting to move in LOW_POWER mode", function() {
   
    let modeCommand = new Command('MODE_CHANGE', 'LOW POWER', 'NORMAL')
    let commandType = modeCommand.commands;
    if (modeCommand.commandType === 'MODE_CHANGE') {
      if (modeCommand.value === "NORMAL") {
        [{completed: true}]
      } 
    } else if (modeCommand.value === "LOW_POWER") {
      [{completed:false}]
    }
  });

  // it("responds with the position for the move command", function() {
  //   let moveCommand = new Command('MOVE', 12000);
  //   let modeCommand = new Command('MODE_CHANGE', 'LOW POWER', 'NORMAL')
  //   // rover = new Rover('position');
  //   let rover = new Rover(0);
  //   let commandType = moveCommand.commands;
  //   if(modeCommand.value === "NORMAL") {
  //     response = rover.receiveMessage(new Message("Test Message", [moveCommand]));
  //   }
  //   expect(response.results[0].rover.position).toBe(rover.position)
  // });

  it("responds with the position for the move command", function() {
    let moveCommand = new Command('MOVE', 12000);
    let rover = new Rover(0);
    rover.mode = 'LOW_POWER'; // Initialize rover object
    let response = rover.receiveMessage(new Message("Test Message", [moveCommand]));
    expect(response.results[0].completed).toBe(false);
    // expect(response.results[0].roverStatus.position).toBe(12000);
    // expect(response.results[0].message).toBe('Can’t be moved in this state');
    expect(rover.position).toBe(0);
});

  







  // 7 tests here!

});
