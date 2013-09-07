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

function getPropertyValueById(data, property, id) {
	var value = null;
	
	var values = getPropertyValues(data, property);
	for (var i = 0; i < values.length; i++) {
		if (values[i].id == id) {
			value = values[i];
			break;
		}
	}
	
	return value;
}

function parseDate(input) {
	var date;
	
	if (input.substring(0, 1) == "-") {
		date = parseInt(input.substring(1, input.length)) + " BC";
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
}

function handleLocation(parent_id, id, mid, name) {
    var request = gapi.client.request({
    	'path': '/freebase/v1/topic' + mid,
    	'params': { "lang": locale, "filter": "/location/location/geolocation" }
    	});
	request.execute(function(result) {
		value = getPropertyValueByIndex(result, '/location/location/geolocation', 0);
		if (value != null) {
			var property = value.property;

			if (property != null) {
				var latitude = property["/location/geocode/latitude"].values[0].value;
				var longitude = property["/location/geocode/longitude"].values[0].value;
				
				var geocoder = new google.maps.Geocoder();
				var lat = parseFloat(latitude);
				var lng = parseFloat(longitude);
				var latlng = new google.maps.LatLng(lat, lng);
				geocoder.geocode({'latLng': latlng}, function(results, status) {
					if (status == google.maps.GeocoderStatus.OK) {
						if (results) {
							for (i = 0; i < results.length; i++) {
								var result = results[i];
								
								var address_components = result.address_components;
								if (address_components != null && address_components.length != 0) {
									if (address_components[0].types[0] == "locality") {
										$(id).text(result.formatted_address);    
										break;
									}
								}
							}
						}
					}
				});
			}
		}
    });
}

function handleAuthor(mid) {
	$('meta[name=author_mid]').attr('content', mid);
    var request = gapi.client.request({
    	'path': '/freebase/v1/topic' + mid,
    	'params': { "lang": locale }
    	});
	request.execute(function(result) {
		var value = getNotableFor(result);
		if (value == null) {
			$("#author_notable_for").hide();
		}
		else {
			$("#author_notable_for").text(value);
			$("#author_notable_for").show();
		}
		
		value = getPropertyValueByIndex(result, '/common/topic/description', 0);
		if (value == null) {
			$("#author_description").hide();
		}
		else {
			$("#author_description").text(value.value);
			citation = value.citation;
			if (citation) {
				$("#author_description").append("&nbsp;");
				$("<a/>").attr("href", citation.uri).attr("title", citation.statement).attr("target", "_new").text(citation.provider).appendTo("#author_description");
			}
			$("#author_description").show();
			$("#author_summary_li").show();
		}
		
		if (getPropertyValues(result, '/common/topic/image') == null) {
			$("#author_image").removeAttr("src"); 
			$("#author_image").attr("style", "display:none;");    
			$("#author_image").hide();
		}
		else {
			$("#author_image").attr("src", "https://usercontent.googleapis.com/freebase/v1/image" + mid + "?lang=" + locale + "&key=AIzaSyAXwb8gGqL5QfOLAmKyT7vF3OHEtiaV-Nw&maxwidth=125&maxheight=125&mode=fillcropmid&errorid=/freebase/no_image_png");
			$("#author_image").removeAttr("style"); 
			$("#author_image").show(); 
		}
		
		hide = true;
		value = getPropertyValueByIndex(result, '/people/person/date_of_birth', 0);
		if (value == null) {
			$("#author_birth_date").hide();    
		}
		else {
			$("#author_birth_date").text(parseDate(value.value));    
			$("#author_birth_date").show();    
			hide = false;
		}
		
		value = getPropertyValueByIndex(result, '/people/person/place_of_birth', 0);
		if (value == null) {
			$("#author_birth_place").hide();    
		}
		else {
			$("#author_birth_place").text(value.text);    
			$("#author_birth_place").show();  
			hide = false;
			
			handleLocation("#birth", "#author_birth_place", value.id, value.text);
		}
		
		if (hide) {
			$("#author_birth_li").hide();    
		}
		else {
			$("#author_birth_li").show();
		}
		
		hide = true;
		value = getPropertyValueByIndex(result, '/people/deceased_person/date_of_death', 0);
		if (value == null) {
			$("#author_death_date").hide();    
		}
		else {
			$("#author_death_date").text(parseDate(value.value));    
			$("#author_death_date").show();    
			hide = false;
		}
		
		value = getPropertyValueByIndex(result, '/people/deceased_person/place_of_death', 0);
		if (value == null) {
			$("#author_death_place").hide();    
		}
		else {
			$("#author_death_place").text(value.text);    
			$("#author_death_place").show();  
			hide = false;

			handleLocation("#death", "#author_death_place", value.id, value.text);
		}
		
		if (hide) {
			$("#author_death_li").hide();    
		}
		else {
			$("#author_death_li").show();
		}

		value = getPropertyValueByIndex(result, '/common/topic/official_website', 0);
		if (value == null) {
			$("#author_website_li").hide();
		}
		else {
			$("#author_website_url").attr("href", value.text);
			$("#author_website_url").text(value.text);
			$("#author_website_li").show();
		}
	});
}

function appendToString(string, separator, value) {
	if (string == null) {
		string = value;
	}
	else {
		string += separator + value;
	}
	
	return string;
}

function getNotableFor(data) {
	var string = null;
	
	var values = getPropertyValues(data, "/common/topic/notable_for");
	if (values != null) {
		for (i = 0; i < values.length; i++) {
			string = appendToString(string, ", ", values[i].text);
		}
	}
	
	return string;
}

function getTvSeriesEpisode(data) {
	var string = null;
	
	var value = getPropertyValueByIndex(data, '/type/object/name', 0);
	if (value != null) {
		string = value.text;
	}

	value = getPropertyValueByIndex(data, '/tv/tv_series_episode/series', 0);
	if (value != null) {
		string = appendToString(string, ", ", value.text);
	}
	
	value = getNotableFor(data);
	if (value != null) {
		string = appendToString(string, " ", "(" + value + ")");
	}

	return string;
}

function getGenericSource(data) {
	var string = null;
	
	var value = getPropertyValueByIndex(data, '/type/object/name', 0);
	if (value != null) {
		string = value.text;
	}

	value = getNotableFor(data);
	if (value != null) {
		string += ((string != null) ? " " : "") + "(" + value + ")";
	}

	return string;
}

function handleSource(source) {
	if (source == null) {
		$("#quotation_source_li").hide();    
	}
	else {
	    var request = gapi.client.request({
	    	'path': '/freebase/v1/topic' + source.id,
	    	'params': { "lang": locale }
	    	});
		request.execute(function(result) {
			var string = null;
			
			if (getPropertyValueById(result, '/type/object/type', "/tv/tv_series_episode") != null) {
				string = getTvSeriesEpisode(result);
			}
			else {
				string = getGenericSource(result);
			}
				
			if (string == null) {
				$("#quotation_source_li").hide();    
			}
			else {
				$("#quotation_source").text(string);
				$("#quotation_source_li").show();
			}
	    });
	}
}

function handleQuotation(mid) {
	$('meta[name=quotation_mid]').attr('content', mid);
	$("#refresh_image").attr("src", "/images/spinner_e3e3e3.gif");
	$("#freebase_link").attr("href", "http://freebase.com" + mid);
    var request = gapi.client.request({
    	'path': '/freebase/v1/topic' + mid,
    	'params': { "lang": locale }
    	});
	request.execute(function(result) {
    	
		var value = getPropertyValueByIndex(result, '/type/object/name', 0);
		if (value == null) {
			$("#quotation").text("");
			$("#twitter_link").attr("href", "https://twitter.com/intent/tweet");
		}
		else {
			var quotation = value.value;
			var tweet = quotation;

			$("#quotation").text(quotation);
			
			value = getPropertyValueByIndex(result, '/common/topic/description', 0);
			if (value == null) {
				$("#quotation_description").hide();    
			}
			else {
				$("#quotation_description").text(value.value);
				$("#quotation_description").show();
			}
			
			value = getPropertyValueByIndex(result, '/media_common/quotation/spoken_by_character', 0);
			if (value == null) {
				$("#quotation_spoken_by_character_li").hide();    
			}
			else {
				$("#quotation_spoken_by_character").text(value.text);
				$("#quotation_spoken_by_character_li").show();
			}
			
			handleSource(getPropertyValueByIndex(result, '/media_common/quotation/source', 0));
				
			value = getPropertyValueByIndex(result, '/media_common/quotation/author', 0);
			if (value == null) {
				$('meta[name=author_mid]').attr('content', '');
				$("#author_name_li").hide();
				$("#author_summary_li").hide();
				$("#author_birth_li").hide();
				$("#author_death_li").hide();
				$("#author_website_li").hide();
			}
			else {
				$("#author_name").text(value.text);
				$("#author_name_li").show();
				
				tweet += " " + value.text;
				
				handleAuthor(value.id);
			}
			
			$("#twitter_link").attr("href", "https://twitter.com/intent/tweet?text=" + tweet);
		}
   	});
	}

function randomQuotation() {
	$("#refresh_image").attr("src", "/images/spinner_e3e3e3.gif");

	var location = window.location;
	var query = location.protocol + "//" + location.host + location.pathname + "quotation/random/mid";
	// console.debug("random quotation: " + query);
	$.getJSON(query, {}).done(function(data) {
		var mid = data.mid;
		// console.debug("mid: " + mid);
		//mid = "/m/0c7cy7d";
		handleQuotation(mid);
		$("#refresh_image").attr("src", "/images/refresh16x16.png");
	}).fail(function(jqxhr, textStatus, error) {
		//console.error(jqxhr);
		//console.error(textStatus);
		//console.error(error);
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
    initialize("ready");
});

function onLoadGoogleClient() {
    gapi.client.setApiKey(getApiKey());
    initialize("google client loaded");
}