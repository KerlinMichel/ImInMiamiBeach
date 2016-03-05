angular.module('starter.controllers').factory('Directory', function(Miami) {
  var dir = 'place';

  var rest = [
    'rest.',
    {title : 'Restaurants & Bar', id : 1, child : 1},
    {title : 'Bakery', id : 2, child : 447},
    {title : 'Bar', id : 3, child : 3}
  ];

  var Hotels = [
    'hotels.',
    {title: 'Bed-Breakfast-Inn', id: 458, child : 458},
    {title: 'Rooms with kitchens', id: 528, child : 528}
  ]
//wifi 677
//atm - 670
  var places = [
    { title: 'Restaurants', id: 1, child : rest },
    { title: 'Hotels', id: 360, child : Hotels },
    { title: 'Clubs', id: 3, child : rest },
    { title: 'Small events', id: 4, child : rest },
    { title: 'Concerts', id: 5, child : rest },
    { title: 'Zoos', id: 6, child : rest }
  ];

  return{
    getDir : function() {
      if(dir.substring(0,5) === 'place') {
        if(dir.substring(6,10) === 'rest') {
          return rest;
        }
        if(dir.substring(6, 12) === 'hotels') {
          return Hotels;
        }
        return places;
      }
      //return dir;
    },

    getDirByName : function(url) {
      if(url.substring(0,5) === 'place') {
        if(url.substring(6,10) === 'rest') {
          return rest;
        }
        if(url.substring(6, 12) === 'hotels') {
          return Hotels;
        }
        return places;
      }
      //return dir;
    },

    setDir: function(url) {
      dir = url;
    },

    getDirName : function() {
      return dir;
    },

    moveup : function(item) {
      //console.log(dir);
      if(dir.indexOf('.') < 0) {
        var str = item[0];
        dir += ('-' + str);
        return 0;
      }
      else {
        Miami.getData(item);
        return Miami.getList();
        //console.log(item);
      }
    },

    movedown() {
      if(dir.indexOf('-') > -1) {
          var i = dir.length-1;
          while(i > 0) {
            if(dir.charAt(i) === '-') {
               break;
               continue;
            }
            i--;
          }
          dir = dir.substring(0, i);
      }
    }
  }
})
