'use strict';

// Handle the pickup event from the server
function handlePickup(payload) {
  console.log(`Order ${payload.orderId} has been picked up from ${payload.vendor}.`);
}

module.exports = {
  handlePickup,
};
