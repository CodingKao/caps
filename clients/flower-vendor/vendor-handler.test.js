'use strict';

const { createOrder , packageDelivered } = require('./handler');

jest.mock('../socket.js', () => {
  const emitMock = jest.fn(); 

  return {
    io: {
      connect: jest.fn().mockReturnValue({
        emit: emitMock,
      }),
    },
  };
});

let consoleSpy;

beforeAll(() => {
  consoleSpy = jest.spyOn(console, 'log').mockImplementation();
});

afterAll(() => {
  consoleSpy.mockRestore();
});

describe('Flower handler tests', () => {

  let socket;
  let payload;
  beforeEach(() => {
    socket = require('../socket.js').io.connect(); //
    payload = {
      store: 'test',
      orderID: 123,
      customer: 'customer',
      address: 'address',
    };
  });


  test('Can create an order payload', () => {
    createOrder(socket, payload);
    expect(consoleSpy).toHaveBeenCalledWith(`VENDOR: Order #:${payload.orderID} ready for pickup.`);
    expect(socket.emit).toHaveBeenCalledWith('pickup', payload);
  });

  test('Confirms delivery', () => {
    packageDelivered(payload);
    expect(consoleSpy).toHaveBeenCalledWith(`VENDOR: Thank you for your order ${payload.customer}`);
  });


});
