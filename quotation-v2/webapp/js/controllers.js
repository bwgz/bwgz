var controllers = angular.module('controllers', []);

var updateAuthor = function($http, author) {
	$http.get('https://www.googleapis.com/freebase/v1/topic' + author.id + '?key=AIzaSyBAUcgyzMRccb840zUs7KhtwaCDRddRWrc&lang=en').success(function(data) {
		author.setName(data.property['/type/object/name']);
		author.setNotableFor(data.property['/common/topic/notable_for']);
		author.setDescription(data.property['/common/topic/description']);
		author.setImage(data.property['/common/topic/image']);
		author.setDateOfBirth(data.property['/people/person/date_of_birth']);
		author.setPlaceOfBirth(data.property['/people/person/place_of_birth']);
		author.setDateOfDeath(data.property['/people/deceased_person/date_of_death']);
		author.setPlaceOfDeath(data.property['/people/deceased_person/place_of_death']);
		author.setQuotations(data.property['/people/person/quotations']);
	});
};

var updateSubject = function($http, subject) {
	$http.get('https://www.googleapis.com/freebase/v1/topic' + subject.id + '?key=AIzaSyBAUcgyzMRccb840zUs7KhtwaCDRddRWrc&lang=en').success(function(data) {
		subject.setName(data.property['/type/object/name']);
		subject.setDescription(data.property['/common/topic/description']);
		subject.setImage(data.property['/common/topic/image']);
		subject.setQuotations(data.property['/media_common/quotation_subject/quotations_about_this_subject']);
	});
};

controllers.controller('AuthorController', [ '$http', '$routeParams', '$scope',
	function($http, $routeParams, $scope) {
		console.debug("AuthorController - id: " + $routeParams.id);
		
		var author = new Person('/m/' + $routeParams.id);
		$scope.author = author;
		
		updateAuthor($http, author);
	}]);

controllers.controller('QuotationController', [ '$http', '$routeParams', '$scope',
	function($http, $routeParams, $scope) {
		// console.debug("QuotationController - id: " + $routeParams.id);

		$http.get('https://www.googleapis.com/freebase/v1/topic/m/' + $routeParams.id + '?key=AIzaSyBAUcgyzMRccb840zUs7KhtwaCDRddRWrc&lang=en').success(function(data) {
			var quotation = new Quotation(data.id);
			$scope.quotation = quotation;
			
			quotation.setQuotation(data.property['/type/object/name']);
			quotation.setSpokenByCharacter(data.property['/media_common/quotation/spoken_by_character']);
			quotation.setSource(data.property['/media_common/quotation/source']);

			if (quotation.source) {
				$http.get('https://www.googleapis.com/freebase/v1/topic' + quotation.source.id + '?key=AIzaSyBAUcgyzMRccb840zUs7KhtwaCDRddRWrc&lang=en').success(function(data) {
					quotation.source.setType(data.property['/common/topic/notable_types']);
				});
			}
			
			quotation.setAuthors(data.property['/media_common/quotation/author']);
			if (quotation.authors) {
				for (var i = 0; i < quotation.authors.length; i++) {
					var author = quotation.authors[i];
					updateAuthor($http, author);
				}
			}
			
			quotation.setSubjects(data.property['/media_common/quotation/subjects']);
			if (quotation.subjects) {
				for (var i = 0; i < quotation.subjects.length; i++) {
					var subject = quotation.subjects[i];
					// console.debug("QuotationController - subject.id: " + subject.id);
					updateSubject($http, subject);
				}
			}
			
			$http.get('/quotation/random/mid').success(function(data) {
				$scope.refresh = data.mid;
			});
			
			var options = {
				    calltoactionlabel: 'OPEN',
				    calltoactionurl: 'http://quotation.bwgz.org/quotation'+ quotation.id,
					clientid: '848640002630-vgap1rvadjan9hv51j0r8phatdsv4kt9.apps.googleusercontent.com',
					contenturl: 'http://quotation.bwgz.org',
				    cookiepolicy: 'single_host_origin',
				    prefilltext: quotation.quotation
				  };
			
			gapi.interactivepost.render('gplus-share', options);
		});
	}]);

controllers.controller('SubjectController', [ '$http', '$routeParams', '$scope',
	function($http, $routeParams, $scope) {
		// console.debug("SubjectController - id: " + $routeParams.id);
		
		var subject = new Subject('/m/' + $routeParams.id);
		$scope.subject = subject;
		
		updateSubject($http, subject);
	}]);

controllers.controller('TopicController', [ '$http', '$routeParams', '$scope',
	function($http, $routeParams, $scope) {
		// console.debug("TopicController - id: " + $routeParams.id);

		$http.get('https://www.googleapis.com/freebase/v1/topic/m/' + $routeParams.id + '?key=AIzaSyBAUcgyzMRccb840zUs7KhtwaCDRddRWrc').success(function(data) {
			
			$scope.data = data;
		});
	}]);

controllers.controller('RandomQuotationController', [ '$http', '$location', '$scope',
	function($http, $location, $scope) {
		// console.debug("RandomQuotationController");
		$http.get('/quotation/random/mid').success(function(data) {
			$location.path('/quotation' + data.mid).replace();
		});
	}]);

controllers.controller('SearchSubmitController', [ '$location', '$scope',
  	function($location, $scope) {
  		// console.debug("SearchSubmitController");
		$scope.submit = function() {
			if ($scope.text) {
				// console.debug("Ctrl - text: " + $scope.text);
				$location.path('/search?query=' + $scope.text);
				$location.path('/search');
				$location.search({query: $scope.text});
				// console.debug("Ctrl - path: " + $location.path());
			}
		};
  	}]);

controllers.controller('SearchController', [ '$http', '$routeParams', '$scope', 'ngTableParams',
 	function($http, $routeParams, $scope, ngTableParams) {
 		// console.debug("SearchController");
 		
 		$scope.query = $routeParams.query;
 		// console.debug("SearchController - query: " + $scope.query);
 		
 	    $scope.tableParams = new ngTableParams({
 	        page: 1,
 	        count: 10
 	    }, {
 	        total: 0,
 	        getData: function($defer, params) {
 	    		$http.get('https://www.googleapis.com/freebase/v1/search' + '?key=AIzaSyBAUcgyzMRccb840zUs7KhtwaCDRddRWrc' + '&query=' +  $scope.query + '&filter=' + '(any type:/media_common/quotation)' + '&limit=' +  100).success(function(data) {
 	    			var results = data.result;
                    params.total(results.length);
 	    			$defer.resolve(results.slice((params.page() - 1) * params.count(), params.page() * params.count()));
 	    		});
 	        }
 	    });

 	}]);
