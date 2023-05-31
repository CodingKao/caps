'use strict';

// Load Chance
var Chance = require('chance');

// Instantiate Chance so it can be used
var chance = new Chance();

const payload = {
  store: chance.company(),
  orderId: chance.orderId(),
  customer: chance.customer(),
  address: chance.address(),
};

console.log('payload:', payload);
