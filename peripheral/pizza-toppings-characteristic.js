var util = require('util');
var bleno = require('bleno');
var pizza = require('./pizza');

function PizzaToppingsCharacteristic(pizza) {
  bleno.Characteristic.call(this, {
    uuid: 'ec02',
    properties: ['read', 'write'],
    descriptors: [
      new bleno.Descriptor({
        uuid: '2901',
        value: 'Gets or sets the pizza toppings.'
      })
    ]
  });

  this.pizza = pizza;
}

util.inherits(PizzaToppingsCharacteristic, bleno.Characteristic);

PizzaToppingsCharacteristic.prototype.onWriteRequest = function(data, offset, withoutResponse, callback) {
  console.log('write toppings -> ', data);
  if (offset) {
    console.log('offset err');
	callback(this.RESULT_ATTR_NOT_LONG);
  }
  else if (data.length !== 2) {
	  console.log('invalid attribute lengfth');
    callback(this.RESULT_INVALID_ATTRIBUTE_LENGTH);
  }
  else {
    this.pizza.toppings = data.readUInt16BE(0);
    callback(this.RESULT_SUCCESS);
  }
};

PizzaToppingsCharacteristic.prototype.onReadRequest = function(offset, callback) {
  if (offset) {
    callback(this.RESULT_ATTR_NOT_LONG, null);
  }
  else {
    var data = new Buffer(2);
    data.writeUInt16BE(this.pizza.toppings, 0);
    callback(this.RESULT_SUCCESS, data);
  }
};

module.exports = PizzaToppingsCharacteristic;
