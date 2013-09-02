/*
[{
  "type": "/people/person",
  "mid":  null,
  "/people/person/quotations": [{
    "return": "count"
  }]
}]
*/
function parseDate(input) {
	var date;
	
	if (input.substring(0, 1) == "-") {
		date = parseInt(input.substring(1, input.length)) + " BC";
	}
	else {
		var parts = input.split('-');
		if (parts.length == 1) {
			date = parseInt(parts[0]);
		}
		else {
			Globalize.culture(language);
			
			if (parts.length == 2) {
				d = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1);
				date = Globalize.format(d, 'd');
			}
			else {
				d = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
				date = Globalize.format(d, 'd');
			}
		}
	}
	
	return date;
}

function handleLocation(parent_id, id, mid, name) {
	var freebaseAPI = "https://www.googleapis.com/freebase/v1/topic" + mid + "?lang=" + language + "&filter=/location/location/geolocation" ;
	$.getJSON(freebaseAPI, {})
	.done(function(data) {
		property = data.property['/location/location/geolocation'];
		
		if (property != null && property.values != null && property.values.length != 0) {
			property = property.values[0].property;

			if (property != null) {
				latitude = property["/location/geocode/latitude"].values[0].value;
				longitude = property["/location/geocode/longitude"].values[0].value;
				
				var mapsAPI = "http://maps.googleapis.com/maps/api/geocode/json?latlng=" + latitude + "," + longitude + "&sensor=false";
				$.getJSON(mapsAPI, {})
				.done(function(data) {
					var address = null;
					
					if (data.results != null) {
						
						var results = data.results;
						for (var i = 0; i < results.length; i++) {
							result = results[i];
							
							address_components = result.address_components;
							if (address_components != null && address_components.length != 0) {
								if (address_components[0].types[0] == "locality") {
									address  = result.formatted_address;
									break;
								}
							}
						}
					}
					
					if (address != null) {
						$(id).text(address);    
					}
				});
			}
		}
	}).error(function(jqXHR, textStatus, errorThrown) {
		$(id).text(name);    
    });
}

function handleAuthor(mid) {
	var query = "https://www.googleapis.com/freebase/v1/topic" + mid + "?lang=" + language + "&key=AIzaSyAXwb8gGqL5QfOLAmKyT7vF3OHEtiaV-Nw&filter=/type/object/name&filter=/people/person/date_of_birth&filter=/people/person/place_of_birth&filter=/people/deceased_person/date_of_death&filter=/people/deceased_person/place_of_death&filter=/common/topic/description&filter=/common/topic/notable_for&filter=/common/topic/official_website&filter=/people/person/quotations&filter=/location/location/geolocation&callback=?" ;
	$.getJSON(query, {})
	.done(function(data) {
		property = data.property['/common/topic/notable_for'];
		if (property == null || property.values == null || property.values.length == 0) {
			$("#author_notable_for").text();
			$("#author_notable_for").attr("hidden", "hidden");
		}
		else {
			var text = "";
			var values = property.values;
			for (i = 0; i < values.length; i++) {
				if (i != 0) {
					text += ", ";
				}
				text += values[i].text;
			}
			
			$("#author_notable_for").text(text);
			$("#author_notable_for").removeAttr("hidden");
		}
		
		property = data.property['/common/topic/description'];
		if (property == null || property.values == null || property.values.length == 0) {
			$("#author_description").text();
			$("#author_description").attr("hidden", "hidden");
		}
		else {
			value = property.values[0];
			$("#author_description").text(value.value);
			citation = value.citation;
			if (citation) {
				$("#author_description").append("&nbsp;");
				$("<a/>").attr("href", citation.uri).attr("title", citation.statement).attr("target", "_new").text(citation.provider).appendTo("#author_description");
			}
			$("#author_description").removeAttr("hidden");
			$("#author_summary_li").removeAttr("hidden");
		}
		
		$("#image").attr("src", "https://usercontent.googleapis.com/freebase/v1/image" + mid + "?lang=" + language + "&key=AIzaSyAXwb8gGqL5QfOLAmKyT7vF3OHEtiaV-Nw&maxwidth=125&maxheight=125&mode=fillcropmid&errorid=/freebase/no_image_png");
		
		hide = true;
		property = data.property['/people/person/date_of_birth'];
		if (property == null || property.values == null || property.values.length == 0) {
			$("#birth_date").text();    
			$("#birth_date").attr("hidden", "hidden");    
		}
		else {
			value = property.values[0];
			
			$("#birth_date").text(parseDate(value.value));    
			$("#birth_date").removeAttr("hidden");    
			hide = false;
		}
		
		property = data.property['/people/person/place_of_birth'];
		if (property == null || property.values == null || property.values.length == 0) {
			$("#birth_place").text();    
			$("#birth_place").attr("hidden", "hidden");    
		}
		else {
			value = property.values[0];
			
			$("#birth_place").text(value.text);    
			$("#birth_place").removeAttr("hidden");  
			hide = false;
			
			handleLocation("#birth", "#birth_place", value.id, value.text);
		}
		
		if (hide) {
			$("#author_birth_li").attr("hidden", "hidden");    
		}
		else {
			$("#author_birth_li").removeAttr("hidden");
		}
		
		hide = true;
		property = data.property['/people/deceased_person/date_of_death'];
		if (property == null || property.values == null || property.values.length == 0) {
			$("#death_date").text();    
			$("#death_date").attr("hidden", "hidden");    
		}
		else {
			value = property.values[0];
			
			$("#death_date").text(parseDate(value.value));    
			$("#death_date").removeAttr("hidden");    
			hide = false;
		}
		
		property = data.property['/people/deceased_person/place_of_death'];
		if (property == null || property.values == null || property.values.length == 0) {
			$("#death_place").text();    
			$("#death_place").attr("hidden", "hidden");    
		}
		else {
			value = property.values[0];
			
			$("#death_place").text(value.text);    
			$("#death_place").removeAttr("hidden");  
			hide = false;

			handleLocation("#death", "#death_place", value.id, value.text);
		}
		
		if (hide) {
			$("#author_death_li").attr("hidden", "hidden");    
		}
		else {
			$("#author_death_li").removeAttr("hidden");
		}

		property = data.property['/common/topic/official_website'];
		if (property == null || property.values == null || property.values.length == 0) {
			$("#author_website_url").text();
			$("#author_website_li").attr("hidden", "hidden");
		}
		else {
			value = property.values[0];
			
			$("#author_website_url").attr("href", value.text);
			$("#author_website_url").text(value.text);
			$("#author_website_li").removeAttr("hidden");
		}
	});
}
		
function handleQuotation(mid) {
	$("#freebase_url").attr("href", "http://freebase.com" + mid);
	var query = "https://www.googleapis.com/freebase/v1/topic" + mid + "?lang=" + language + "&key=AIzaSyAXwb8gGqL5QfOLAmKyT7vF3OHEtiaV-Nw";
	$.getJSON(query, {})
	.done(function(data) {
		property = data.property['/type/object/name'];
		if (property == null || property.values == null || property.values.length == 0) {
			quotation = "";
		}
		else {
			quotation = property.values[0].value;
	
			tweet = quotation;
		}
		
		$("#quotation").text(quotation);
		
		property = data.property['/common/topic/description'];
		if (property == null || property.values == null || property.values.length == 0) {
			$("#quotation_description").text();
			$("#quotation_description").attr("hidden", "hidden");    
		}
		else {
			$("#quotation_description").text(property.values[0].value);
			$("#quotation_description").removeAttr("hidden");
		}
		
		property = data.property['/media_common/quotation/spoken_by_character'];
		if (property == null || property.values == null || property.values.length == 0) {
			$("#quotation_spoken_by_character").text();
			$("#quotation_spoken_by_character_li").attr("hidden", "hidden");    
		}
		else {
			$("#quotation_spoken_by_character").text(property.values[0].text);
			$("#quotation_spoken_by_character_li").removeAttr("hidden");
		}
		
		property = data.property['/media_common/quotation/source'];
		if (property == null || property.values == null || property.values.length == 0) {
			$("#quotation_source").text();
			$("#quotation_source_li").attr("hidden", "hidden");    
		}
		else {
			$("#quotation_source").text(property.values[0].text);
			$("#quotation_source_li").removeAttr("hidden");
		}

		property = data.property['/media_common/quotation/author'];
		if (property == null || property.values == null || property.values.length == 0) {
			$("#author_name_li").attr("hidden", "hidden");
			$("#author_summary_li").attr("hidden", "hidden");
			$("#author_birth_li").attr("hidden", "hidden");
			$("#author_death_li").attr("hidden", "hidden");
			$("#author_website_li").attr("hidden", "hidden");
		}
		else {
			author = property.values[0];
			$("#author_name").text(author.text);
			$("#author_name_li").removeAttr("hidden");
			
			tweet += " " + author.text;
			
			handleAuthor(author.id);
			
		}
		
		$("#tweet").attr("href", "https://twitter.com/intent/tweet?text=" + tweet);
	}).error(function(jqXHR, textStatus, errorThrown) {
    });
}

function randomQuotation() {
	$("#refresh").attr("src", "/images/spinner_e3e3e3.gif");

	var location = window.location;
	var query = location.href + "quotation/random/mid";
	$.getJSON(query, {}).done(function(data) {
		var mid = data.mid;
		handleQuotation(mid);
		$("#refresh").attr("src", "/images/refresh16x16.png");
	}).error(function(jqXHR, textStatus, errorThrown) {
    });
}
		
$(document).ready(function() {
	randomQuotation();
});