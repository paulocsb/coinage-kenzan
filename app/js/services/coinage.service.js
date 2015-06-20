coinageApp.factory('coinageService', ['$http', function($http) {

	coinageService = [];

	coins = [
 		{id: 200, text: '£2'},
    {id: 100, text: '£1'},
    {id: 50, text: '50p'},
    {id: 20, text: '20p'},
    {id: 2, 	text: '2p'},
    {id: 1, 	text: '1p'}
  ];

	coinageService.calculateAmount = function(input) {
		return coinageService.getMinimumCoins(coinageService.normalizeInput(input));
	};

	coinageService.normalizeInput = function(input) {
    var pounds = false;
    
    input = input || '';

    if(input != '') {
      input = input.trim();
    }

    if (input.indexOf('£') !== -1) {
      pounds = true;
    }

    ['£', 'p', /\.$/].forEach(function(val, i) {
      input = input.replace(val, '');
    });

    var matches = /^([\d]+(?:\.[\d]+)?)$/.exec(input);
    
    if (matches) {
      var match = matches[1];

      if (pounds || (match.indexOf('.') !== -1)) {
        return parseInt(Math.round(match * Math.pow(10, 2)));
      } else {
        return parseInt(match);
      }
    }

    return 0;
  };

  coinageService.getMinimumCoins = function(input, test=false) {
	  
	  input = input || '';

    if(input != '') {
      input = parseInt(input);
    }

	  var retval = test ? {} : [];
	  var i = 0;

	  [200, 100, 50, 20, 2, 1].forEach(function(val, i) {
	    i = Math.floor(input / val);

	    if (i > 0) {
	      input -= i * val;
	      if(!test){
	      	retval.push({ coin: getAmountValue(val), count: i });
	    	}
	    	else {
	    		retval[val] = i;
	    	}
	    }
	  });

	  return retval;
  };

  getAmountValue = function(val) {
  	var t = '';
  	$.each(coins, function(v, i) {
  		if(i.id == val) {
  			t = i.text;
  			return;
  		}
  	});
  	return t;
  };

	return coinageService;

}]);