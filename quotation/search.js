var last_type_selected;

var type = 'keyword';
var query;
var index = 0;
var length = 0;
var hits = 0;				// total number of search results
var rpp = 8;				// results per page

function updateAuthor(mid, id) {
    request = gapi.client.request({
    	'path': 'freebase/v1/topic' + mid,
    	'params': {
    		'filter': '/media_common/quotation/author',
    	}
    });

	request.execute(function(json) {
		if (json.property != undefined) {
			var values = json.property['/media_common/quotation/author'].values;
			
			for (var i = 0; i < values.length; i++) {
				if (i != 0) {
					$('#' + id).append(', ');
				}
				$('#' + id).append(values[i].text);
			}
		}
    });
}

function page(cursor, limit) {
	var params;
	
	if (type == 'keyword') {
		params = {
    		'query':  query,
    		'filter': '(any type:/media_common/quotation)',
    		'cursor': cursor,
    		'limit':  limit
		};
	}
	else if (type == 'author') {
		params = {
    		'filter': '(all type:/media_common/quotation /media_common/quotation/author:"' + query + '")',
    		'cursor': cursor,
    		'limit':  limit
		};
	}
	else if (type == 'subject') {
		params = {
    		'filter': '(all type:/media_common/quotation /media_common/quotation/subjects:"' + query + '")',
    		'cursor': cursor,
    		'limit':  limit
		};
	}
	
    request = gapi.client.request({
    	'path': '/freebase/v1/search',
    	'params': params
    });
	request.execute(function(json) {
		if (json.error != undefined) {
			
		}
		else {
			hits = Math.min(200, json.hits);
		
			index = cursor;
			length = json.result.length;
			
			if (index == 0 && length == 0) {
				$("#not-found").show();
				$("#search-results").hide();
			}
			else if (length != 0) {
				$("#quotation-list").html('');
				for (var i = 0; i < length; i++) {
					var quotation = json.result[i].name;
					var mid = json.result[i].mid;
					var url = "http://quotation.bwgz.org/quotation" + mid;
					
					var quotation_id = "item-" + i;
					var author_id = "item-authors-" + i;
					
					$("#quotation-list").append('<div class="result"><a id="' + quotation_id + '" href="' + url + '" data-mid="' + mid + '" target="_blank">' + json.result[i].name + '</a><div id="' + author_id + '" style="font-style:italic;"></div></div>');
					updateAuthor(mid, author_id);
					$('#' + quotation_id).click(function() {
				        _gaq.push(['_trackEvent', 'result-link', 'clicked', $(this).attr('data-mid')]);
					});
					
					$("#not-found").hide();
					$("#search-results").show();
				}
			}
		}
		
		if (index == 0) {
			$("#previous").hide();
		}
		else {
			$("#previous").show();
		}
		
		if (length != limit || index + length >= hits) {
			$("#next").hide();
		}
		else {
			$("#next").show();
		}
		
		$("#pages").html('');
		var current = Math.ceil((index + length) / rpp);
		var pages = Math.ceil(hits / rpp);
		var start = (current <= 6 || pages <= 10) ? 0 : Math.min(current - 6, pages - 10);
		var end = Math.min(Math.max(current + 4, 10), pages);
		var string = "";
		for (var i = start; i < end; i++) {
			if (i + 1 == current) {
				string += '<span class="current">' + (i + 1) + '</span>';
			}
			else {
				string += '<span class="page" data-index="' + (i * 10) + '">' + (i + 1) + '</span>';
			}
		}
		$("#pages").append(string);
	    $('.page').click(function() {
	        page(parseInt($(this).attr('data-index')), rpp);
	        _gaq.push(['_trackEvent', 'page', 'clicked', query]);
	    });
    });
}

function search(event) {
	index = 0;
	length = 0;
	hits = 0;
	query = $('#query-field').val();
	
	page(index, rpp);
    _gaq.push(['_trackEvent', 'search', 'clicked', query]);

	return false;
}

function previous() {
	page(index - rpp, rpp);
    _gaq.push(['_trackEvent', 'previous', 'clicked', query]);
}

function next() {
	page(index + length, rpp);
    _gaq.push(['_trackEvent', 'next', 'clicked', query]);
}

function pasteSelection() {
	chrome.tabs.query({active:true, currentWindow: true}, function(tab) {
		chrome.tabs.sendMessage(tab[0].id, {method: "getSelection"}, function(response) {
			if (response != undefined && response.data != undefined) {
				var data = response.data.trim();
				
				if (data.length != 0) {
					$('#query-field').val(data);
				    search(null);
				    _gaq.push(['_trackEvent', 'selection', data]);
				}
			}
		});
	});
}

function restoreOptions() {
	var value = localStorage["search_type"];
	if (value) {
		type = value;
	}
	
	var value = localStorage["results_per_page"];
	if (value) {
		rpp = value;
	}
}

function setupSearchType() {
	var selected;
	
	switch (type)
	{
	case "keyword":
		selected = "search_type_keyword";
		break;
	case "author":
		selected = "search_type_author";
		break;
	case "subject": 
		selected = "search_type_subject";
		break;
	}
	
	$('#' + selected).attr('class', 'category selected');
	$('#' + selected).parent().children(".icon-arrow-down-container").children(".icon-arrow-down").show();
	
	last_type_selected = selected;
}

function getApiKey() {
	return 'AIzaSyAXwb8gGqL5QfOLAmKyT7vF3OHEtiaV-Nw';
}

function onLoadGoogleClient() {
    gapi.client.setApiKey(getApiKey());
    
    restoreOptions();
    setupSearchType();
    
	pasteSelection();

	$('form').submit(search);
	$('#previous').click(previous);
	$('#next').click(next);
	
    $('#quotation_link').on('click', function() {
        _gaq.push(['_trackEvent', 'quotation-link', 'clicked']);
	});
    $('#terms_privacy_link').on('click', function() {
        _gaq.push(['_trackEvent', 'terms-privacy-link', 'clicked']);
	});
    $('#bwgz_link').on('click', function() {
        _gaq.push(['_trackEvent', 'bwgz-link', 'clicked']);
	});
    $('#freebase_link').on('click', function() {
        _gaq.push(['_trackEvent', 'freebase-link', 'clicked']);
	});
    
    $('.category').click(function() {
    	var selected = $(this).attr('id');
        _gaq.push(['_trackEvent', selected, 'clicked']);
        
        if (selected != last_type_selected) {
        	$('#' + last_type_selected).attr('class', 'category');
        	$('#' + last_type_selected).parent().children(".icon-arrow-down-container").children(".icon-arrow-down").hide();
        	
        	$('#' + selected).attr('class', 'category selected');
        	$('#' + selected).parent().children(".icon-arrow-down-container").children(".icon-arrow-down").show();
        	
        	type = $(this).attr('data-type');
        	last_type_selected = selected;
        }
    });
    
}