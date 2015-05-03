'use strict';

exports.register = function(server, options, next){

  var authenticate = {
    key: process.env.LOVER_SHIT_YO,
    validateFunc: function(jwt, cb){
      var now = Date.now();
      var jwtTime = jwt.iat * 1000;
      var oneDayAgo = now - 86400000;
      console.log('now', now,'jwtTime', jwtTime,'oneDayAgo', oneDayAgo);
      if(jwtTime > oneDayAgo && now > jwtTime){
        cb(null, true, {uid:jwt.d.uid});
      }else{
        cb();
      }
    }
  };
  server.expose({authenticate: authenticate});
  return next();
};

exports.register.attributes = {
  name: 'authentication'
};
