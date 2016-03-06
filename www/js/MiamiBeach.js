angular.module('starter.controllers').factory('Miami', function() {
  var theUrl = 'http://www.miamibeachapi.com/rest/a.pi/businesses/search';
  var eventsUrl = 'http://www.miamibeachapi.com/rest/a.pi/events/search';
	var consumerKey = "anonymous";
	var consumerSecret = "anonymous";
	var token = "5f02d1155718dd804e34a094c19d408d0ae585d7";
	var tokenSecret = "e35439d74db66d1367f69d2cf84c5032ae2af960";

	var accessor = {
		consumerKey: consumerKey
		, consumerSecret : consumerSecret
		, token  : token
		, tokenSecret   : tokenSecret
	};

	var message = {
		method: "GET"
		, action: theUrl
		, parameters: {}
	};

  var messageEve = {
		method: "GET"
		, action: eventsUrl
		, parameters: {}
	};

  var list = [];
  var events = [];

  var type;

  var info;

  return{
    getData: function(filter) {
        message.parameters = {};
    		message.parameters['rows'] = 100;
    		message.parameters['page'] = 1;
    		message.parameters['category_filter'] = filter;
    		message.parameters['jsoncallback'] = '?';
    		message.parameters['oauth_timestamp'] = freshTimestamp();
    		message.parameters['oauth_nonce'] = freshNonce();

        messageEve.parameters = {};
    		messageEve.parameters['rows'] = 100;
    		messageEve.parameters['page'] = 1;
    		messageEve.parameters['category_filter'] = filter;
    		messageEve.parameters['jsoncallback'] = '?';
    		messageEve.parameters['oauth_timestamp'] = freshTimestamp();
    		messageEve.parameters['oauth_nonce'] = freshNonce();

        OAuth.completeRequest(message, accessor);
		    OAuth.SignatureMethod.sign(message, accessor);
		    var encodedParams = OAuth.formEncode(message.parameters);
		    var getURL = theUrl + '?' + encodedParams;

        $.getJSON(getURL, function(data){
    			var outHTML = "";
    			if(data.businesses){
            list = data;
    			}
    			$('#results').html(outHTML);
    		});

        OAuth.completeRequest(messageEve, accessor);
        OAuth.SignatureMethod.sign(messageEve, accessor);
        var encodedParams1 = OAuth.formEncode(messageEve.parameters);
        var eURL = eventsUrl + '?' + encodedParams1;

        $.getJSON(eURL, function(data1){
          console.log(eURL);
          console.log(data1);
    			var outHTML = "";
    			if(data1.events){
            events = data1;
    			}
    			$('#results').html(outHTML);
    		});

  },

  getList : function() {
    if(type === 'places')
      return list['businesses'];
    else {
      return events['events'];
    }
    /*if(type === 'places') {
      return list['businesses'];
      console.log('asdf');
    }
    else {
      console.log('1234');
      console.log(events);
      return events;
    }*/
  },

  setType : function(input) {
      type = input;
  },

  getType : function() {
    return type;
  },

  setInfo : function(place) {
    info = place;
  },

  getInfo : function() {
    return info;
  }
}

  function freshTimestamp() {
		return OAuth.timestamp();
	};
	function freshNonce() {
		return OAuth.nonce(11);
	};

})
