'use strict';

const handler = require('./handler');

describe('Vendor Handler', () => {
  it('should handle the pickup event', () => {
    // Mock the console.log method
    console.log = jest.fn();

    const payload = {
      orderId: '12345',
      vendor: '1-206-flowers',
    };

    // Call the handlePickup function with the payload
    handler.handlePickup(payload);

    // Check if the console.log method was called with the expected message
    expect(console.log).toHaveBeenCalledWith(
      `Order ${payload.orderId} has been picked up from ${payload.vendor}.`
    );
  });
});


