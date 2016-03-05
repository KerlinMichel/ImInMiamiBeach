angular.module('starter.controllers').factory('Miami', function() {
  var theUrl = 'http://www.miamibeachapi.com/rest/a.pi/businesses/search';
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

  var list = [];

  return{
    getData: function(filter) {
        message.parameters = {};
    		message.parameters['rows'] = 100;
    		message.parameters['page'] = 1;
    		message.parameters['category_filter'] = filter;
    		message.parameters['jsoncallback'] = '?';
    		message.parameters['oauth_timestamp'] = freshTimestamp();
    		message.parameters['oauth_nonce'] = freshNonce();

        OAuth.completeRequest(message, accessor);
		    OAuth.SignatureMethod.sign(message, accessor);
		    var encodedParams = OAuth.formEncode(message.parameters);
		    var getURL = theUrl + '?' + encodedParams;

        $.getJSON(getURL, function(data){
    			var outHTML = "";
    			if(data.businesses){
            list = data;
            console.log(list['businesses']);
    			}
    			$('#results').html(outHTML);
    		});

  },

  getList : function() {
    console.log(list);
    return list['businesses'];
  }
}

  function freshTimestamp() {
		return OAuth.timestamp();
	};
	function freshNonce() {
		return OAuth.nonce(11);
	};

})
