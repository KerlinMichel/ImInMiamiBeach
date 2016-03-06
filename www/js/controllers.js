angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope, Directory, $state, $stateParams) {
  //$state.go('app.tree');
  $scope.playlists = function() {
    Directory.setDir($stateParams.dir);
    return Directory.getDirByName($stateParams.dir);
  }
  //$scope.playlists = Directory.getDirByName($stateParams.dir);
  //console.log($stateParams.dir);
  $scope.moveup = function(id) {
    var flag = Directory.moveup(id['child']);
    if(flag !== 0) {
      $state.go('app.list');
    } else {
      $state.go('app.tree/', {dir : Directory.getDirName()});
    }
  };

  $scope.filter = function(item) {
    var type = typeof item;
    return type === 'string';
  };

  $scope.movedown = function() {
    Directory.movedown();
    $scope.playlists = Directory.getDirByName($stateParams.dir);
  }
})

.controller('PlaylistCtrl', function($scope, $stateParams, $state, Miami) {
    $scope.list = Miami.getList();
    $scope.list = function() {
      return Miami.getList();
    }

    $scope.info = function(place) {
      Miami.setInfo(place);
      $state.go('app.info');
    }
})

.controller('InfoCtrl', function($scope, Miami) {
  $scope.info = Miami.getInfo();
});
