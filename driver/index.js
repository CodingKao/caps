const io = require('socket.io-client');

const socket = io.connect('http://localhost:3000/caps'); // Connect to the CAPS server

// Listen for pickup events from the CAPS server
socket.on('pickup', (payload) => {
  console.log(`Picking up order ${payload.orderId} from ${payload.vendor}`);
  // Emit the in-transit event to the CAPS server
  socket.emit('in-transit', payload);

  // Simulate delivery after a random delay between 3 to 5 seconds
  setTimeout(() => {
    console.log(`Delivering order ${payload.orderId} to ${payload.customer}`);
    // Emit the delivered event to the CAPS server
    socket.emit('delivered', payload);
  }, getRandomDelay());
});

// Generate a random delay between 3 to 5 seconds (in milliseconds)
function getRandomDelay() {
  return Math.floor(Math.random() * (5000 - 3000 + 1)) + 3000;
}
