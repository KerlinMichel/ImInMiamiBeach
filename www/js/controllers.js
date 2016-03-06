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

.controller('LocCtrl', function($scope, Location) {
   //$scope.myLatlng = new google.maps.LatLng(lat,lng);
   //console.log($scope.myLatlng);
   $scope.showPosition = function (position) {
        $scope.lat = position.coords.latitude;
        $scope.lng = position.coords.longitude;
        $scope.accuracy = position.coords.accuracy;
        Location.setLat(position.coords.latitude);
        Location.setLong(position.coords.longitude);
        //console.log($scope.lat);
        //console.log($scope.lng);
        $scope.$apply();

        var latlng = new google.maps.LatLng($scope.lat, $scope.lng);
        //$scope.model.myMap.setCenter(latlng);
        //$scope.myMarkers.push(new google.maps.Marker({ map: $scope.model.myMap, position: latlng }));
      }

      $scope.showError = function (error) {
        $scope.error = "map broke";
        $scope.$apply();
      }
   console.log(navigator.geolocation.getCurrentPosition($scope.showPosition, $scope.showError));
   $scope.getlat = function() {
     return $scope.lat;
   };
   $scope.getlng = function() {
     return $scope.lng;
   }
   $scope.getLocation = function () {
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition($scope.showPosition, $scope.showError);
          console.log(navigator.geolocation.getCurrentPosition($scope.showPosition, $scope.showError));
      }
      else {
          console.log("MAP ERROR");
      }
    }
})
.directive('map', ['Location',function(Location) {
    return {
        restrict: 'A',
        link:function(scope, element, attrs, $compile){
          var zValue = scope.$eval(attrs.zoom);

          scope: {
            getlat = '&getlat',
            getlng = '&getlng'
          }
          var lat;
          var lng;
          scope.$watch('getlat()', function(newVal, oldVal, $compile){
             lat = scope.getlat();
             lng = scope.getlng();

             if (newVal !== oldVal) {

               myLatlng = new google.maps.LatLng(lat,lng),
               mapOptions = {
                  zoom: zValue,
                  center: myLatlng
                },
                map = new google.maps.Map(element[0],mapOptions),
                marker = new google.maps.Marker({
                    position: myLatlng,
                    map: map,
                    draggable:true
              });
               //map = new google.maps.Map(element[0],mapOptions);
               //$compile(element)(scope);
             }
             console.log(lng);
         });

          //var lat = scope.getlat();
          //var lng = scope.getlng();

          var myLatlng = new google.maps.LatLng(lat,lng),
          mapOptions = {
             zoom: zValue,
             center: myLatlng
           },
           map = new google.maps.Map(element[0],mapOptions),
           marker = new google.maps.Marker({
               position: myLatlng,
               map: map,
               draggable:true
         });

        }
    };
}])

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

.controller('PlaylistCtrl', function($scope, $stateParams, $state, Miami, Directory, Location) {

    $scope.list = function() {
      return Miami.getList();
    }

    $scope.close = function(item) {
      if(Miami.getType() !== 'places')
        return;
        console.log(item);
      for(var i = 0; i < item['datatable_categories'].length; i++) {
        //console.log(item['datatable_categories']);
        /*item['datatable_categories'][i]['datatable_category_id'] == 401 ||
          item['datatable_categories'][i]['datatable_category_id'] == 441 ||
          item['datatable_categories'][i]['datatable_category_id'] == 394 ||
          item['datatable_categories'][i]['datatable_category_id'] == 516

          if(Math.abs(Location.getLat() - item['lat']) < 0.24)
            if(Math.abs(Location.getLong() - item['lng']) < 0.24)*/
        if(true) {
            //console.log(Math.abs(Location.getLat() - item['lat']) < 0.25);
            //console.log(Math.abs(Location.getLong() - item['lng']) < 0.25);
            console.log(Location.getDistance(Location.getLat(), Location.getLong(), item['lat'], item['lng']));
            if(Location.getDistance(Location.getLat(), Location.getLong(), item['lat'], item['lng']) < 15)
            return true;
        }
      }
    return false;
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
