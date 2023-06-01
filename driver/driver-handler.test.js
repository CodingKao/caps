const io = require('socket.io-client');
const faker = require('faker');

const socket = io.connect('http://localhost:3000/caps'); // Connect to the CAPS server

// Simulate pickup event
test('should emit in-transit event after receiving a pickup event', (done) => {
  const payload = {
    orderId: faker.random.uuid(),
    vendor: '1-206-flowers',
    customer: faker.name.findName(),
    address: faker.address.streetAddress(),
  };

  socket.emit('pickup', payload);

  // Listen for in-transit event
  socket.on('in-transit', (inTransitPayload) => {
    expect(inTransitPayload).toEqual(payload);
    done();
  });
});

// Simulate delivered event
test('should emit delivered event after a random delay', (done) => {
  const payload = {
    orderId: faker.random.uuid(),
    vendor: '1-206-flowers',
    customer: faker.name.findName(),
    address: faker.address.streetAddress(),
  };

  socket.emit('pickup', payload);

  // Listen for delivered event
  socket.on('delivered', (deliveredPayload) => {
    expect(deliveredPayload).toEqual(payload);
    done();
  });
});
