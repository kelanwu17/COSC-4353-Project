// store data in an array for admin events
let events = [];
let eventsId = 1; 

function incrementEventsId() {
  return eventsId++;
}

module.exports = {
  events,
  incrementEventsId,
};

