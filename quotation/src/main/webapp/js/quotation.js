/*
[{
  "type": "/people/person",
  "mid":  null,
  "/people/person/quotations": [{
    "return": "count"
  }]
}]
*/
function randomQuotation() {
	$("#refresh").attr("src", "images/spinner_e3e3e3.gif");

	var query = "https://www.googleapis.com/freebase/v1/mqlread/?key=AIzaSyAXwb8gGqL5QfOLAmKyT7vF3OHEtiaV-Nw&lang=%2Flang%2Fen&query=%5B%7B+%22type%22%3A+%22%2Fpeople%2Fperson%22%2C+%22mid%22%3A+null%2C+%22%2Fpeople%2Fperson%2Fquotations%22%3A+%5B%7B+%22return%22%3A+%22count%22+%7D%5D+%7D%5D";
	$.getJSON(query, {}).done(function(data) {
		var mid = data.result[Math.floor(Math.random()*data.result.length)].mid;
		quotation(mid);
		$("#refresh").attr("src", "images/refresh16x16.png");
		
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
			  else if (parts.length == 2) {
				  date = parseInt(parts[1]) + "/" + parseInt(parts[0]);
			  }
			  else {
				  date = parseInt(parts[1]) + "/" + parseInt(parts[2]) + "/" + parseInt(parts[0]);
			  }
			}
			
			return date;
		}
		
		function location(id, mid) {
			var freebaseAPI = "https://www.googleapis.com/freebase/v1/topic" + mid + "?filter=/location/location/geolocation" ;
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
			});
		}

		function quotation(mid) {
			var freebaseAPI = "https://www.googleapis.com/freebase/v1/topic" + mid + "?key=AIzaSyAXwb8gGqL5QfOLAmKyT7vF3OHEtiaV-Nw&filter=/media_common/quotation_source/quotations&filter=/type/object/name&filter=/people/person/date_of_birth&filter=/people/person/place_of_birth&filter=/people/deceased_person/date_of_death&filter=/people/deceased_person/place_of_death&filter=/common/topic/description&filter=/common/topic/notable_for&filter=/common/topic/official_website&filter=/people/person/quotations&filter=/location/location/geolocation&callback=?" ;
			$.getJSON(freebaseAPI, {})
			.done(function(data) {
				property = data.property['/people/person/quotations'];
				if (property) {
					quotations = property.values;
					quotation = quotations[Math.floor(Math.random()*quotations.length)];
				}
				else {
					property = data.property['/media_common/quotation_source/quotations'];
					if (property) {
						quotations = property.values;
						quotation = quotations[Math.floor(Math.random()*quotations.length)];
					}
				}
				
				if (quotation) {
					var tweet = quotation.text;
					
					$("#quotation").text(quotation.text);

					property = data.property['/type/object/name'];
					if (property == null || property.values == null || property.values.length == 0) {
						  $("#author").attr("hidden", "hidden");
					}
					else {
						value = property.values[0];
						
						$("#author_name").text(value.text);
						$("#author").removeAttr("hidden");
						
						tweet += " " + value.text;
					}
				
					$("#tweet").attr("href", "https://twitter.com/intent/tweet?text=" + tweet);
					
					property = data.property['/common/topic/notable_for'];
					if (property == null || property.values == null || property.values.length == 0) {
						  $("#notable_for").attr("hidden", "hidden");
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
						
						$("#notable_for").text(text);
						$("#notable_for").removeAttr("hidden");
					}

					property = data.property['/common/topic/description'];
					if (property == null || property.values == null || property.values.length == 0) {
						  $("#description").attr("hidden", "hidden");
					}
					else {
						value = property.values[0];
						$("#description").text(value.value);
						citation = value.citation;
						if (citation) {
							$("#description").append("&nbsp;");
							$("<a/>").attr("href", citation.uri).attr("title", citation.statement).attr("target", "_new").text(citation.provider).appendTo("#description");
						}
						$("#description").removeAttr("hidden");
					}
					
					$("#image").attr("src", "https://usercontent.googleapis.com/freebase/v1/image" + mid + "?key=AIzaSyAXwb8gGqL5QfOLAmKyT7vF3OHEtiaV-Nw&maxwidth=125&maxheight=125&mode=fillcropmid&errorid=/freebase/no_image_png");
					
					hide = true;
					property = data.property['/people/person/date_of_birth'];
					if (property == null || property.values == null || property.values.length == 0) {
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
						$("#birth_place").attr("hidden", "hidden");    
					}
					else {
						value = property.values[0];
						
						$("#birth_place").text(value.text);    
						$("#birth_place").removeAttr("hidden");  
						hide = false;
						
						location("#birth_place", value.id);
					}
					
					if (hide) {
						$("#birth").attr("hidden", "hidden");    
					}
					else {
						$("#birth").removeAttr("hidden");
					}
					
					hide = true;
					property = data.property['/people/deceased_person/date_of_death'];
					if (property == null || property.values == null || property.values.length == 0) {
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
						$("#death_place").attr("hidden", "hidden");    
					}
					else {
						value = property.values[0];
						
						$("#death_place").text(value.text);    
						$("#death_place").removeAttr("hidden");  
						hide = false;

						location("#death_place", value.id);
					}
					
					if (hide) {
						$("#death").attr("hidden", "hidden");    
					}
					else {
						$("#death").removeAttr("hidden");
					}

					property = data.property['/common/topic/official_website'];
					if (property == null || property.values == null || property.values.length == 0) {
						$("#website").attr("hidden", "hidden");
					}
					else {
						value = property.values[0];
						
						$("#website_url").attr("href", value.text);
						$("#website_url").text(value.text);
						$("#website").removeAttr("hidden");
					}
				}
				
				$("#freebase_url").attr("href", "http://freebase.com" + mid);
			});
		};
	});
}
		
$(document).ready(function() {
	randomQuotation();
});