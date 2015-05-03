'use strict';

angular.module('facebook')
.controller('ProfileCtrl', function($scope, $window, Profile){
  $scope.user = {};

  $scope.save = function(profile){
    Profile.save(profile)
    .then(function(){
      $window.swal({title: 'Success', text: 'Save profile successful!', type: 'success'});
    })
    .catch(function(){
      $window.swal({title: 'Registration Error', text: 'There was a problem with your registration. Please try again.', type: 'error'});
    });
  };

  $scope.camOn = function(){
    $scope.webcamOn = true;
    $window.Webcam.set({
      width: 320,
      height: 240,
      destWidth: 640,
      destHeight: 480,
      imageFormat: 'png',
      jpegQuality: 90,
    });
    $window.Webcam.attach('#camera');
    };

  $scope.takeSnapshot = function(){
    $window.Webcam.snap(function(dataUri){
      $scope.user.photo = dataUri;
    });
  };

  $scope.camOff = function(){
    $scope.webcamOn = false;
    $window.Webcam.reset();
  };

});
