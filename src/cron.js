'use strict';

var Part = require('./part');
var units = require('./units');

/**
 * Creates an instance of Cron.
 * Cron objects each represent a cron schedule.
 *
 * @constructor
 * @this {Cron}
 */
function Cron() {
  this.parts = null;
}

/**
 * Parses a cron string.
 *
 * @this {Cron}
 * @param {string} str The string to parse.
 */
Cron.prototype.parse = function(str) {
  if (typeof str !== 'string') {
    throw new Error(
        'Invalid cron string'
    );
  }
  var parts = str.replace(/\s+/g, ' ').trim().split(' ');
  if (parts.length === 5) {
    this.parts = parts.map(function(str, idx) {
      return new Part(str, units[idx]);
    });
  } else {
    throw new Error(
        'Invalid cron string format'
    );
  }
  return this;
};

/**
 * Returns the cron schedule as
 * a 2-dimentional array of integers.
 *
 * @this {Cron}
 * @return {array} The cron schedule as an array.
 */
Cron.prototype.toArray = function() {
  if (this.parts === null) {
    throw new Error(
        'No schedule found'
    );
  }
  return this.parts.map(function(part) {
    return part.toArray();
  });
};

/**
 * Returns the cron schedule as a string.
 *
 * @this {Cron}
 * @return {string} The cron schedule as a string.
 */
Cron.prototype.toString = function() {
  if (this.parts === null) {
    throw new Error(
        'No schedule found'
    );
  }
  return this.parts.join(' ');
};

module.exports = Cron;
