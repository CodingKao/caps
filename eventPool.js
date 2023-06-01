const events = {
  pickup: [],
  'in-transit': [],
  delivered: [],
};

function addEventListener(eventName, callback) {
  if (events[eventName]) {
    events[eventName].push(callback);
  }
}

function removeEventListener(eventName, callback) {
  if (events[eventName]) {
    const index = events[eventName].indexOf(callback);
    if (index !== -1) {
      events[eventName].splice(index, 1);
    }
  }
}

function emitEvent(eventName, payload) {
  if (events[eventName]) {
    events[eventName].forEach((callback) => {
      callback(payload);
    });
  }
}

module.exports = {
  addEventListener,
  removeEventListener,
  emitEvent,
};
