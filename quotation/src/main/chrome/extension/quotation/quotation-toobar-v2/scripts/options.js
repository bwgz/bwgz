function save_search_type() {
    var value = document.querySelector('input[name="search_type"]:checked').value;
	localStorage["search_type"] = value;
}

function save_results_per_page() {
    value = document.querySelector('input[name="results_per_page"]').value;
	localStorage["results_per_page"] = value;
}

function restore_options() {
	var value = localStorage["search_type"];
	if (!value) {
		value = "keyword";
	}
    var select = document.getElementById("search_type_" + value);
    select.checked = true;
	
	var value = localStorage["results_per_page"];
	if (!value) {
		value = "5";
	}
    var select = document.getElementById("results_per_page");
    select.value = value;
}

document.addEventListener('DOMContentLoaded', restore_options);

document.querySelector('#search_type_keyword').addEventListener('click', save_search_type);
document.querySelector('#search_type_author').addEventListener('click', save_search_type);
document.querySelector('#search_type_subject').addEventListener('click', save_search_type);
document.querySelector('#results_per_page').addEventListener('click', save_results_per_page);
