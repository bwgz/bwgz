
(function() {
	function getApiKey() {
		return 'AIzaSyAXwb8gGqL5QfOLAmKyT7vF3OHEtiaV-Nw';
	}
	
	function getProperty(data, property) {
		return (data.property != null) ? data.property[property] : null;
	}

	function getPropertyValues(data, property) {
		var values = null;
		
		var _property = getProperty(data, property);
		if (_property != null) {
			values = _property.values;
		}
		
		return values;
	}

	function getPropertyValueByIndex(data, property, index) {
		var value = null;
		
		var values = getPropertyValues(data, property);
		if (values != null && values.length > index) {
			value = values[index];
		}
		
		return value;
	}

	function initContext(context) {
		  context.fillStyle = '#FFFFFF';
		  context.fillRect(0, 0, 19, 19);
		}

	function handleQuotation(mid) {
	    var request = gapi.client.request({
	    	'path': '/freebase/v1/topic' + mid
	    	});
		request.execute(function(result) {
			var value = getPropertyValueByIndex(result, '/type/object/name', 0);
			if (value != null) {
				chrome.browserAction.setTitle({title: value.value});
				
				value = getPropertyValueByIndex(result, '/media_common/quotation/author', 0);
				if (value != null) {
					var canvas = document.getElementById('canvas');
					var context = canvas.getContext('2d');
					var img = new Image();
					img.onload = function() {
						context.drawImage(this, 0, 0);

						var imageData = context.getImageData(0, 0, img.width, img.height);
						chrome.browserAction.setIcon({imageData: imageData});
					}
					img.src = "https://usercontent.googleapis.com/freebase/v1/image" + value.id + "?maxwidth=19&maxheight=19&key=AIzaSyAXwb8gGqL5QfOLAmKyT7vF3OHEtiaV-Nw";
				}
				
			}
	    });
	}

	function handler() {
		var query = "http://quotation.bwgz.org/quotation/random/mid";
		$.getJSON(query, {}).done(function(data) {
			var mid = data.mid;
			
			handleQuotation(mid);
			setTimeout(handler, 30 * 60 * 1000);
			
		}).fail(function(jqxhr, textStatus, error) {
	    });
	}

	function main() {
		setTimeout(handler, 0);
	}
	
	main();

})();