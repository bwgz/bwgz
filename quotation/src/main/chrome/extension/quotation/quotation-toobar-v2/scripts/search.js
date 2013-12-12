var selected = 'keyword_quotation';
var query;
var index = 0;
var length = 0;
var max = 0;
var step = 8;

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
	
	if (selected == 'keyword_quotation') {
		params = {
    		'query':  query,
    		'filter': '(any type:/media_common/quotation)',
    		'cursor': cursor,
    		'limit':  limit
		};
	}
	else if (selected == 'author_quotation') {
		params = {
    		'filter': '(all type:/media_common/quotation /media_common/quotation/author:"' + query + '")',
    		'cursor': cursor,
    		'limit':  limit
		};
	}
	else if (selected == 'subject_quotation') {
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
			max = Math.min(200, json.hits);
		
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
		
		if (length != limit || index + length >= max) {
			$("#next").hide();
		}
		else {
			$("#next").show();
		}
		
		$("#pages").html('');
		var current = Math.ceil((index + length) / step);
		var pages = Math.ceil(max / step);
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
	        page(parseInt($(this).attr('data-index')), step);
	        _gaq.push(['_trackEvent', 'page', 'clicked', query]);
	    });
    });
}

function search(event) {
	index = 0;
	length = 0;
	max = 0;
	query = $('#query-field').val();
	
	page(index, step);
    _gaq.push(['_trackEvent', 'search', 'clicked', query]);

	return false;
}

function previous() {
	page(index - step, step);
    _gaq.push(['_trackEvent', 'previous', 'clicked', query]);
}

function next() {
	page(index + length, step);
    _gaq.push(['_trackEvent', 'next', 'clicked', query]);
}

function pasteSelection() {
	chrome.tabs.query({active:true, currentWindow: true}, function(tab) {
		chrome.tabs.sendMessage(tab[0].id, {method: "getSelection"}, function(response) {
			if (response != undefined && response.data != undefined) {
				$('#query-field').val(response.data);
			    _gaq.push(['_trackEvent', 'selection', response.data]);
			}
		});
	});
}

function getApiKey() {
	return 'AIzaSyAXwb8gGqL5QfOLAmKyT7vF3OHEtiaV-Nw';
}

var category = "keyword_quotation";

function onLoadGoogleClient() {
    gapi.client.setApiKey(getApiKey());
    
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
    	selected = $(this).attr('id');
        _gaq.push(['_trackEvent', selected, 'clicked']);
        
        if (selected != category) {
        	$('#' + category).attr('class', 'category');
        	$('#' + selected).attr('class', 'category selected');
        	
        	$('#' + category).parent().children(".icon-arrow-down-container").children(".icon-arrow-down").hide();
        	$('#' + selected).parent().children(".icon-arrow-down-container").children(".icon-arrow-down").show();
        	
        	category = selected;
        }
    });
}