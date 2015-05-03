'use strict';

angular.module('facebook')
.factory('Profile', function($http, nodeUrl){

  function Profile(){
  }

  Profile.save = function(profile){
    return $http.put(nodeUrl + '/profile', profile);
  };

return Profile;
});
