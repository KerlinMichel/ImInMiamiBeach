angular.module('starter.controllers').factory('Directory', function(Miami) {
  var dir = 'place';

  var rest = [
    'rest.',
    {title : 'Restaurants & Bar', image: 'https://upload.wikimedia.org/wikipedia/commons/d/d4/South_beach_miami_at_night.JPG',id : 1, child : 361},
    {title : 'Bakery',image:'https://i.ytimg.com/vi/o1Mmg8n4fOs/maxresdefault.jpg', id : 2, child : 447},
    {title : 'Bar', image: 'https://pixabay.com/static/uploads/photo/2015/02/22/03/15/martini-644743_960_720.jpg', id : 3, child : 657}
  ];

  var Hotels = [
    'hotels.',
    {title: 'All hotels', id: 458, child : 360},
    {title: 'Bed-Breakfast-Inn', id: 458, child : 458},
    {title: 'Rooms with kitchens', id: 528, child : 528}
  ]

  var parking = [
    'parking.',
    {title: 'Underutilized Parking', image: 'http://64.207.179.53/images/uploads/CarParkingSign2.jpg', id : 1, child : 441},
    {title: 'Self Parking', image: 'http://64.207.179.53/images/uploads/CarParkingSign2.jpg', id : 1, child : 394},
    {title: 'Valet Parking', image: 'http://64.207.179.53/images/uploads/CarParkingSign2.jpg', id : 1, child : 516}
  ]

  var eventls = [
    'eventls.',
    {title: 'Comedy', image: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/Ultra-music-festival-week-1-miami-fl-2013.jpg', id : 1, child : 596},
    {title: 'Music', image: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/Ultra-music-festival-week-1-miami-fl-2013.jpg', id : 1, child : 602},
    {title: 'Visual Arts', image: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/Ultra-music-festival-week-1-miami-fl-2013.jpg', id : 1, child : 607},
    {title: 'Performing Arts', image: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/Ultra-music-festival-week-1-miami-fl-2013.jpg', id : 1, child : 604},
    {title: 'Fairs and Festivals', image: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/Ultra-music-festival-week-1-miami-fl-2013.jpg', id : 1, child : 600},
  ]
//wifi 677
//atm - 670
  var places = [
    { title: 'Restaurants', image: 'https://upload.wikimedia.org/wikipedia/commons/d/dc/Sidewalk_Cafe_(Miami_Beach)-1.jpg', id: 1, child : rest },
    { title: 'Hotels',image:'https://upload.wikimedia.org/wikipedia/commons/e/eb/Eden_Roc_exterior_FL2.jpg', id: 360, child : Hotels },
    { title: 'Clubs',image:'https://c1.staticflickr.com/5/4083/5180544101_866b517c2e_b.jpg', id: 3, child : rest },
    { title: 'Events', image: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/Ultra-music-festival-week-1-miami-fl-2013.jpg', id: 4, child : eventls },
    { title: 'Concerts',image:'https://scontent-mia1-1.xx.fbcdn.net/hphotos-xlf1/v/wl/t35.0-12/12842659_10204155270721450_818691782_o.jpg?oh=d80c1d5c8b36ac3047b5db075df2e089&oe=56DDD453', id: 5, child : rest },
    {title: 'Parking', image: 'http://64.207.179.53/images/uploads/CarParkingSign2.jpg', id: 6, child : parking}
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
        if(url.substring(6,13) === 'eventls') {
          return eventls;
        }
        if(url.substring(6,13) === 'parking') {
          return parking;
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
      if(dir.indexOf('.') < 0) {
        var str = item[0];
        dir += ('-' + str);
        return 0;
      }
      else {
        Miami.getData(item);
        Miami.setType('places');
        if(dir.indexOf('event') > -1) {
          Miami.setType('event');
        }
        return Miami.getList();
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
