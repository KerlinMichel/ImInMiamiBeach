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
    },


 getDistance : function(la1, ln1, la2, ln2) {
   var rad = function(x) {
     return x * Math.PI / 180;
   }
  var R = 6378137; // Earth’s mean radius in meter
  var dLat = rad(la2 - la1);
  var dLong = rad(ln2 - ln1);
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rad(la1)) * Math.cos(rad(la2)) *
    Math.sin(dLong / 2) * Math.sin(dLong / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d*0.000621371; // returns the distance in meter
    }

  }
})
