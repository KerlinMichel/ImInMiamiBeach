angular.module('starter.controllers').factory('Location', function() {

  var long;
  var lat;

  return{
    getLong: function() {
      return long;
    },
    getLat: function() {
      return lat;
    },
    setLong: function(l) {
      long = l;
    },
    setLat: function(l) {
      lat = l;
    }
  }
})
