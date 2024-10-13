let events = [];
let eventsId = 1;

const getNextEventId = () => eventsId++;

module.exports = {
    events,
    getNextEventId,
};

