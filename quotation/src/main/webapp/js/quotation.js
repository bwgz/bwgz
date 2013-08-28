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
		$("#refresh").attr("src", "images/refresh.gif");
		
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
					
					var date = "";
					property = data.property['/people/person/date_of_birth'];
					if (property.length == 0) {
						  $("#birth").remove();
					}
					else {
						date = property.values[0].value;
						
						if (date.length == 0) {
							  $("#birth").remove();
						}
						else {
							if ($("#birth").length) {
								$("#birth_date").text(date);    
								$("#birth_place").text("");    
							}
							else {
								$("#details").append($("<li>").attr("id", "birth").append($("<strong>").text("Born: ")).append($("<span>").attr("id", "birth_date").text(date)).append($("<span>").attr("id", "birth_place")));    
							}
							
							property = data.property['/people/person/place_of_birth'];
							if (property) {
								value = property.values[0];
								var freebaseAPI = "https://www.googleapis.com/freebase/v1/topic" + value.id + "?filter=/common/topic/alias&callback=?" ;
								$.getJSON(freebaseAPI, {})
								.done(function(data) {
									property = data.property['/common/topic/alias'];
									value = property.values[0];
									$("#birth_place").text(" " + value.value);
								});
							}
						}
					}
					
					property = data.property['/people/deceased_person/date_of_death'];
					if (property.length == 0) {
						  $("#death").remove();
					}
					else {
						date = property.values[0].value;
						
						if (date.length == 0) {
							  $("#death").remove();
						}
						else {
							if ($("#death").length) {
								$("#death_date").text(date);    
								$("#death_place").text("");    
							}
							else {
								$("#details").append($("<li>").attr("id", "death").append($("<strong>").text("Died: ")).append($("<span>").attr("id", "death_date").text(date)).append($("<span>").attr("id", "death_place")));    
							}
							
							property = data.property['/people/deceased_person/place_of_death'];
							if (property) {
								value = property.values[0];
								var freebaseAPI = "https://www.googleapis.com/freebase/v1/topic" + value.id + "?filter=/common/topic/alias&callback=?" ;
								$.getJSON(freebaseAPI, {})
								.done(function(data) {
									property = data.property['/common/topic/alias'];
									value = property.values[0];
									$("#death_place").text(" " + value.value);
								});
							}
						}
					}

					$("#tweet").attr("href", "https://twitter.com/intent/tweet?text=" + tweet);
				}
			    });
			};
	});
}
		
$(document).ready(function() {
	randomQuotation();
});