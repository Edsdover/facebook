'use strict';

angular.module('facebook')
.controller('NavCtrl', function($rootScope, $scope, $state, User, $http){

  $scope.afAuth.$onAuth(function(data){
    if(data){
      $rootScope.activeUser = data;
      $rootScope.displayName = getDisplayName(data);
      $http.defaults.headers.common.Authorization = 'Bearer ' + data.token;
    }else{
      $rootScope.activeUser = null;
      $rootScope.displayName = null;
      $http.defaults.headers.common.Authorization = null;
    }

    $state.go('profile');
  });

  $scope.logout = function(){
    User.logout();
  };
  function getDisplayName(data){
    switch(data.provider){
      case 'password':
      return data.password.email;
      case 'github':
      return data.github.displayName;
      case 'twitter':
      return data.twitter.displayName;
      case 'facebook':
      return data.facebook.displayName;
      case 'google':
      return data.google.displayName;
    }
  }
});
