'use strict';

var redis = require('../lib/redis');

// Save badges to database
//  badges is an array
exports.save = function(badges, callback) {
  if (!badges.length) return callback(null, null);
  var badge = badges.pop();
  redis.lpush('badges', JSON.stringify(badge), function(err) {
    if (err) return callback(err, null);
    exports.save(badges, callback);
  });
};