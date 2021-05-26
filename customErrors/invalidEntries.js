// Fonte
// https://stackoverflow.com/questions/1382107/whats-a-good-way-to-extend-error-in-javascript

function InvalidEntries(message, code) {
  this.message = message;
  this.stack = Error().stack;
  this.code = code;
}

InvalidEntries.prototype = Object.create(Error.prototype);
InvalidEntries.prototype.name = 'InvalidEntries';

module.exports = InvalidEntries;
