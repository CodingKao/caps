const io = require('socket.io-client');
const socket = io.connect('http://localhost:3000/caps'); // Replace the URL with the appropriate server URL

const storeName = '1-206-flowers'; // Simulated vendor store name

// Emit the pickup event with a payload
function sendPickup() {
  const payload = {
    vendor: storeName,
    orderId: generateOrderId(),
    customerName: generateCustomerName(),
    address: generateAddress(),
  };
  socket.emit('pickup', payload);
}

// Simulate receiving the delivered event from the server
socket.on('delivered', (payload) => {
  console.log(`Thank you for your order, ${payload.customerName}!`);
});

// Helper functions to generate random order data
function generateOrderId() {
  return Math.floor(Math.random() * 1000) + 1;
}

function generateCustomerName() {
  const names = ['Alice', 'Bob', 'Charlie', 'David', 'Eve'];
  return names[Math.floor(Math.random() * names.length)];
}

function generateAddress() {
  const addresses = ['123 Main St', '456 Elm St', '789 Oak St'];
  return addresses[Math.floor(Math.random() * addresses.length)];
}

// Simulate sending multiple orders
const intervalId = setInterval(sendPickup, 3000); // Adjust the interval as needed

// Stop sending orders after a certain time
setTimeout(() => {
  clearInterval(intervalId);
  process.exit(0);
}, 30000); // Adjust the timeout as needed
