var localeDatePattern = 'M/d/yyyy';

angular.module('util', [], function($provide) {
	$provide.factory('parseDate', function() {
	    return function(input) {
	    	var date;
	    	
	    	if (input.substring(0, 1) == "-") {
	    		date = parseInt(input.substring(1, input.length)) + ' BC';
	    	}
	    	else {
	    		var parts = input.split('-');
	    		if (parts.length < 3) {
	    			date = parseInt(parts[0]);
	    		}
	    		else {
	    			var d = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]), 12);
	    			date = d.toString(localeDatePattern);
	    		}
	    	}
	    	
	    	return date;
	      };
	});
});