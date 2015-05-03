'use strict';

var Joi = require('joi');
var User = require('../../models/user');

exports.register = function(server, options, next){
  server.route({
    method: 'PUT',
    path: '/profile',
    config: {
      description: 'Update a User',
      validate: {
        payload: {
          uid: Joi.string(),
          name: Joi.string(),
          email: Joi.string().email(),
          avatar: Joi.string().uri(),
          address: Joi.string(),
          photo: Joi.string(),
          gender: Joi.string(),
          age: Joi.number().min(18).max(100),
          birthday: Joi.date().iso()
        }
      },
      handler: function(request, reply){
        User.findOne({uid: request.auth.credentials.uid}, function(err, user){
          if(user){
            User.findByIdAndUpdate(user._id, request.payload, saveCallback);
          }else{
            user = new User(request.payload);
            user.uid = request.auth.credentials.uid;
            user.save(saveCallback);
          }
        });

        function saveCallback(err, user){
          if(err){
            return reply(JSON.stringify(err)).code(400);
          }else{
            return reply(user);
          }
        }
      }
    }
  });
  return next();
};
exports.register.attributes = {
  name: 'users.update'
};
