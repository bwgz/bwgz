var quotation = angular.module('quotation', [ 'ngRoute', 'ngTable', 'angulartics', 'angulartics.google.analytics', 'controllers' ]);

quotation.config([ '$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
	$locationProvider.html5Mode(true);
	$routeProvider.
	when('/', {
		templateUrl : 'random.html',
		controller : 'RandomQuotationController'
	}).
	when('/author/m/:id', {
		templateUrl : 'author.html',
		controller : 'AuthorController'
	}).
	when('/quotation/m/:id', {
		templateUrl : 'quotation.html',
		controller : 'QuotationController'
	}).
	when('/subject/m/:id', {
		templateUrl : 'subject.html',
		controller : 'SubjectController'
	}).
	when('/topic/m/:id', {
		templateUrl : 'topic.html',
		controller : 'TopicController'
	}).
	when('/search', {
		templateUrl : 'search.html',
		controller : 'SearchController'
	}).
	otherwise({
        redirectTo: '/'
	});
} ]);

var policy = angular.module('policy', [ 'ngRoute' ]);

policy.config([ '$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
	//$locationProvider.html5Mode(true);
	$routeProvider.
	when('/terms', {
		templateUrl : 'terms.html',
	}).
	when('/privacy', {
		templateUrl : 'privacy.html',
	}).
	otherwise({
		templateUrl : 'terms.html',
	});
} ]);
