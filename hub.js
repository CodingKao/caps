'use strict';

const io = require('socket.io')(); // Require and initialize socket.io

const caps = io.of('/caps'); // Create a namespace called 'caps'

caps.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  // Listen for join events to allow clients to join rooms
  socket.on('join', (room) => {
    socket.join(room);
    console.log(`Client ${socket.id} joined room ${room}`);
  });

  // Listen for pickup events from vendors
  socket.on('pickup', (payload) => {
    console.log('New pickup:', payload);

    // Emit pickup event to all sockets except the sender
    socket.broadcast.emit('pickup', payload);

    // Emit in-transit event to the vendor's room
    caps.to(payload.vendor).emit('in-transit', payload);
  });

  // Listen for in-transit events from drivers
  socket.on('in-transit', (payload) => {
    console.log(`Picking up ${payload.id}`);
    caps.to(payload.vendor).emit('in-transit', payload);
  });

  // Listen for delivered events from drivers
  socket.on('delivered', (payload) => {
    console.log(`Package delivered:`, payload);
    caps.to(payload.vendor).emit('delivered', payload);
  });

  // Listen for disconnect events
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

module.exports = {
  start: (port) => {
    io.listen(port);
    console.log(`Socket.io hub is up and running on port ${port}`);
  },
};

