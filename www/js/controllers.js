angular.module('starter.controllers', ['firebase'])

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
.controller('PopCtrl', function($scope, $firebaseArray) {
  var data = new Firebase('https://miamibeach.firebaseio.com/');
  $scope.poppings = $firebaseArray(data);
})

.controller('LocCtrl', function($scope, $cordovaGeolocation) {
  var posOptions = {timeout: 10000, enableHighAccuracy: false};
  $cordovaGeolocation
    .getCurrentPosition(posOptions)
    .then(function (position) {
       $scope.lat  = position.coords.latitude
       $scope.long = position.coords.longitude
    }, function(err) {
      console.log("Location error");
    });
    console.log($scope.lat);
})

.controller('PlaylistsCtrl', function($scope, Directory, $state, $stateParams, Miami) {
  //$state.go('app.tree');
  //var helping = confirm('Click Ok if you want help Miami businesses know how to best serve their custumers by allowing us to give information on your favorite. Click cancel if you refuse.');
  //console.log(helping);
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

.controller('PlaylistCtrl', function($scope, $stateParams, $state, Miami, Directory) {

    $scope.list = function() {
      return Miami.getList();
    }

    $scope.hasWifi = function(item) {
      if(Miami.getType() !== 'places')
        return;
      for(var i = 0; i < item['datatable_categories'].length; i++) {
        if(item['datatable_categories'][i]['datatable_category_id'] == 677) {
          return true;
        }
      }
    return false;
    };

    $scope.isABar = function(item) {
      if(Miami.getType() !== 'places')
        return;
      for(var i = 0; i < item['datatable_categories'].length; i++) {
        if(item['datatable_categories'][i]['datatable_category_id'] == 657) {
          return true;
        }
      }
    return false;
    };

    $scope.hasATM = function(item) {
      if(Miami.getType() !== 'places')
        return;
      for(var i = 0; i < item['datatable_categories'].length; i++) {
        if(item['datatable_categories'][i]['datatable_category_id'] == 670) {
          return true;
        }
      }
      return false;
    };

    $scope.altImg = function(item) {
      if(item['image_url'] !== undefined) {
        return 'http://www.miamibeachapi.com' + item['image_url'];
      }
      var str = Directory.getDirName();
      var i = str.length-1;
      var id = "";
      while(str.charAt(i) !== '-') {
        id += str.charAt(i);
        if(str.charAt(i) === '-') {
           break;
        }
        i--;
      }
      //console.log(Directory.getChild());
      //console.log(Directory.getDirByName(Directory.getDirName()));
      console.log(Directory.getDirByName(Directory.getDirName())[1]);
      return Directory.getDirByName(Directory.getDirName())[1]['image'];
    };

    $scope.info = function(place) {
      Miami.setInfo(place);
      $state.go('app.info');
    }
})

.controller('InfoCtrl', function($scope, Miami, $firebaseObject, $firebaseArray) {
  $scope.info = Miami.getInfo();
  $scope.type = Miami.getType();

  var data = new Firebase('https://miamibeach.firebaseio.com/');
  if($scope.type !== 'places') {
    var arr = $firebaseArray(data.child("/" + $scope.info['event_id']));

    arr.$ref().once('value', function(snapshot) {
        $scope.points = snapshot.val()['popPoints'];
    });

    if(isNaN($scope.points)) {
      $scope.points = 0;
    }

    data.child("/" + $scope.info['event_id']).setWithPriority({name : $scope.info['name'],  Address: $scope.info['street'], date: Date.now(), popPoints : ++$scope.points }, 1);
  }
  else {
    var arr = $firebaseArray(data.child("/" + $scope.info['cust_id']));

    arr.$ref().once('value', function(snapshot) {
        $scope.points = snapshot.val()['popPoints'];
    });

    if(isNaN($scope.points)) {
      $scope.points = 0;
    }
    data.child("/" + $scope.info['cust_id']).setWithPriority({name : $scope.info['name'],  Address: $scope.info['prem_full_address'], date: Date.now(), popPoints : ++$scope.points }, 0);
  }

  $scope.events = $scope.type !== 'places';
  console.log($scope.info);
});
