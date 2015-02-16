'use strict';

var redis = require('../lib/redis');
var broadcast = require('../lib/broadcast');

// Save badges to database ('badges' is an array)
exports.save = function(badges, callback) {
  if (!badges.length) return callback(null, null);
  var badge = badges.pop();
  redis.lpush('badges', JSON.stringify(badge), function(err) {
    if (err) return callback(err, null);
    exports.save(badges, callback);
  });
};

// Trim down the redis list
exports.trim = function() {
  redis.ltrim('badges', 0, 9);
};

// Send out badges to the broadcaster
exports.send = function(badges, callback) {
  // badges.forEach(broadcast.send);  <----
  badges.forEach(function(badge) { //      | same 
    broadcast.send(badge);         //      | thing
  });                              // <----
  callback(null, null);
};

// Get badges from redis
exports.get = function(callback) {
  redis.lrange('badges', 0, -1, function(err, data) {
    if (err) return callback(err, null);
    callback(null, data.map(JSON.parse));
  });
}