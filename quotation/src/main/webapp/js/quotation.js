
$(document).ready(function() {
	function quotation(mid) {
		var freebaseAPI = "https://www.googleapis.com/freebase/v1/topic" + mid + "?key=AIzaSyAXwb8gGqL5QfOLAmKyT7vF3OHEtiaV-Nw&filter=/media_common/quotation_source/quotations&filter=/type/object/name&filter=/people/person/date_of_birth&filter=/people/person/place_of_birth&filter=/people/deceased_person/date_of_death&filter=/people/deceased_person/place_of_death&filter=/common/topic/description&filter=/people/person/quotations&callback=?" ;
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
				if (property) {
					value = property.values[0];
					$("#name").text(value.text);
					
					tweet += " " + value.text;
				}
			
				property = data.property['/common/topic/description'];
				if (property) {
					value = property.values[0];
					$("#description").text(value.value);
					citation = value.citation;
					if (citation) {
						$("#description").append("&nbsp;");
						$("<a/>").attr("href", citation.uri).attr("title", citation.statement).attr("target", "_new").text(citation.provider).appendTo("#description");
					}
				}
				
				$("#image").attr("src", "https://usercontent.googleapis.com/freebase/v1/image" + mid + "?key=AIzaSyAXwb8gGqL5QfOLAmKyT7vF3OHEtiaV-Nw&maxwidth=125&maxheight=125&mode=fillcropmid&errorid=/freebase/no_image_png");
				
				property = data.property['/people/person/date_of_birth'];
				if (property) {
					value = property.values[0];
					//date = new Date(value.value).toISOString();
					//date = new Date(Date.parse(_date));
					$("#details").append($("<li>").attr("id", "date_of_birth").append($("<strong>").text("Born: ")).append(value.value));    
				}
				
				property = data.property['/people/person/place_of_birth'];
				if (property) {
					value = property.values[0];
					var freebaseAPI = "https://www.googleapis.com/freebase/v1/topic" + value.id + "?filter=/common/topic/alias&callback=?" ;
					$.getJSON(freebaseAPI, {})
					.done(function(data) {
						property = data.property['/common/topic/alias'];
						value = property.values[0];
						$("#date_of_birth").append("&nbsp;").append(value.value);
					});
				}
				
				property = data.property['/people/deceased_person/date_of_death'];
				if (property) {
					value = property.values[0];
					$("#details").append($("<li>").attr("id", "date_of_death").append($("<strong>").text("Died: ")).append(value.value));    
				}

				property = data.property['/people/deceased_person/place_of_death'];
				if (property) {
					value = property.values[0];
					var freebaseAPI = "https://www.googleapis.com/freebase/v1/topic" + value.id + "?filter=/common/topic/alias&callback=?" ;
					$.getJSON(freebaseAPI, {})
					.done(function(data) {
						property = data.property['/common/topic/alias'];
						value = property.values[0];
						$("#date_of_death").append("&nbsp;").append(value.value);
					});
				}
				
				$("#tweet").attr("href", "https://twitter.com/intent/tweet?text=" + tweet);
			}
		    });
		};

	/*
	[{
	  "type": "/people/person",
	  "mid":  null,
	  "/people/person/quotations": [{
	    "return": "count"
	  }]
	}]
	*/
	
	var query = "https://www.googleapis.com/freebase/v1/mqlread/?key=AIzaSyAXwb8gGqL5QfOLAmKyT7vF3OHEtiaV-Nw&lang=%2Flang%2Fen&query=%5B%7B+%22type%22%3A+%22%2Fpeople%2Fperson%22%2C+%22mid%22%3A+null%2C+%22%2Fpeople%2Fperson%2Fquotations%22%3A+%5B%7B+%22return%22%3A+%22count%22+%7D%5D+%7D%5D";
	$.getJSON(query, {}).done(function(data) {
		quotation(data.result[Math.floor(Math.random()*data.result.length)].mid);
	});
});