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
    { title: 'Restaurants', image: 'https://upload.wikimedia.org/wikipedia/commons/d/dc/Sidewalk_Cafe_(Miami_Beach)-1.jpg', id: 1, child : rest },
    { title: 'Hotels',image:'https://upload.wikimedia.org/wikipedia/commons/e/eb/Eden_Roc_exterior_FL2.jpg', id: 360, child : Hotels },
    { title: 'Clubs',image:'https://c1.staticflickr.com/5/4083/5180544101_866b517c2e_b.jpg', id: 3, child : rest },
    { title: 'Events', image: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/Ultra-music-festival-week-1-miami-fl-2013.jpg', id: 4, child : rest },
    { title: 'Concerts',image:'https://scontent-mia1-1.xx.fbcdn.net/hphotos-xlf1/v/wl/t35.0-12/12842659_10204155270721450_818691782_o.jpg?oh=d80c1d5c8b36ac3047b5db075df2e089&oe=56DDD453', id: 5, child : rest },
    { title: 'Zoos',image:'https://upload.wikimedia.org/wikipedia/commons/3/34/White_Bengal_tiger_Miami_MetroZoo.jpg', id: 6, child : rest }
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

    getDirName : function() {
      return dir;
    },

    moveup : function(item) {
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
