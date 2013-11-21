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

function handleQuotation(mid) {
	$("#quotation_link").attr("href", "http://quotation.bwgz.org/quotation" + mid);
	$("#freebase_link").attr("href", "http://freebase.com" + mid);
    var request = gapi.client.request({
    	'path': '/freebase/v1/topic' + mid
    	});
	request.execute(function(result) {
		var value = getPropertyValueByIndex(result, '/type/object/name', 0);
		if (value != null) {
			$("#quotation").text(value.value);
				
			value = getPropertyValueByIndex(result, '/media_common/quotation/author', 0);
			if (value != null) {
				$("#quotation_author_name").text(value.text);
				$("#author_image").attr("src", "https://usercontent.googleapis.com/freebase/v1/image" + value.id + "?key=AIzaSyAXwb8gGqL5QfOLAmKyT7vF3OHEtiaV-Nw");
			}
		}
		$("#gloader").hide();    
	}).fail(function(jqxhr, textStatus, error) {
		$("#gloader").hide();    
    });
}

function randomQuotation() {
	var query = "http://quotation.bwgz.org/quotation/random/mid";
	$.getJSON(query, {}).done(function(data) {
		var mid = data.mid;
		
		handleQuotation(mid);
	}).fail(function(jqxhr, textStatus, error) {
		$("#gloader").hide();    
    });
}

var loaded = 0;
function initialize(message) {
	loaded++;
	
	if (loaded == 2) {
		randomQuotation();
	}
}

$(document).ready(function() {
	window.addEventListener('load', gloader);
	initialize("document ready");
});

function getApiKey() {
	return 'AIzaSyAXwb8gGqL5QfOLAmKyT7vF3OHEtiaV-Nw';
}

function onLoadGoogleClient() {
    gapi.client.setApiKey(getApiKey());
    initialize("google client loaded");
}