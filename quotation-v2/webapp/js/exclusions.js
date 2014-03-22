var notableForExclusions = [
	'/m/05zppz',	// Male
];

var isNotableForExclusion = function(id) {
	return notableForExclusions.indexOf(id) != -1;
};