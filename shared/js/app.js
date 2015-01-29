var app = angular.module('handbook', ['ui.router', 'ngAnimate']);

/*
 * Directives
 */
app.directive('popupContainer', function() {
	return {
		restrict: 'A',
		controller: ['$scope', function($scope) {
			$scope.popupActive = null;
		}]
	};
});

app.directive('interactionPopup', function() {
	return {
		retrict: 'E',
		templateUrl: 'shared/directives/interactionPopup/interactionPopup.tpl.html',
		scope: {
			id: '@',
			text: '@',
			content: '@'
		},
		controller: ['$scope', function($scope) {
			$scope.isOpen = false;

			$scope.container = 'button-popup-container-' + $scope.id;

			$scope.showPopup = function(id) {
				if($scope.$parent.popupActive === id) {
					$scope.$parent.popupActive = null;
				} else {
					$scope.$parent.popupActive = id;
				}
			};
		}]
	};
});

app.directive('popup', function() {
	return {
		restrict: 'E',
		transclue: true,
		templateUrl: 'shared/directives/popup/popup.tpl.html',
		scope: {
			'content': '=',
			'closeCb': '&'
		}
	};
});

app.directive('rhetoricLearnIt', function() {
	return {
		restrict: 'E',
		templateUrl: 'shared/directives/rhetoricLearnIt/rhetoricLearnIt.tpl.html',
		scope: {
			id: '@',
			title: '@',
			text: '@',
		},
		controller: ['$scope', function($scope) {
			$scope.isOpen = false;

			$scope.showPopup = function(id) {
				if($scope.$parent.popupActive === id) {
					$scope.$parent.popupActive = null;
				} else {
					$scope.$parent.popupActive = id;
				}
			};
		}]
	};
});

app.run([
	"$rootScope", "$state", "$stateParams", "$templateCache", "$http", function($rootScope, $state, $stateParams, $templateCache, $http) {

		$templateCache.put("cached=home/home.html", $http({method: 'GET', url: 'home/home.html', cache: true}));
		$templateCache.put("cached=writers-concerns/writers-concerns.html", $http({method: 'GET', url: 'writers-concerns/writers-concerns.html', cache: true}));
		$templateCache.put("cached=writers-concerns/intro/intro.html", $http({method: 'GET', url: 'writers-concerns/intro/intro.html', cache: true}));
		$templateCache.put("cached=writers-process/writers-process.html", $http({method: 'GET', url: 'writers-process/writers-process.html', cache: true}));
		$templateCache.put("cached=writers-process/intro/intro.html", $http({method: 'GET', url: 'writers-process/intro/intro.html', cache: true}));
		$templateCache.put("cached=writers-process/writers-process.html", $http({method: 'GET', url: 'writers-process/writers-process.html', cache: true}));
		$templateCache.put("cached=writers-process/intro/intro.html", $http({method: 'GET', url: 'writers-process/intro/intro.html', cache: true}));
		$templateCache.put("cached=part-1/part-1.html", $http({method: 'GET', url: 'part-1/part-1.html', cache: true}));
		$templateCache.put("cached=part-1/intro/intro.html", $http({method: 'GET', url: 'part-1/intro/intro.html', cache: true}));
		$templateCache.put("cached=part-2/part-2.html", $http({method: 'GET', url: 'part-2/part-2.html', cache: true}));
		$templateCache.put("cached=part-2/intro/intro.html", $http({method: 'GET', url: 'part-2/intro/intro.html', cache: true}));
		$templateCache.put("cached=part-3/part-3.html", $http({method: 'GET', url: 'part-3/part-3.html', cache: true}));
		$templateCache.put("cached=part-3/intro/intro.html", $http({method: 'GET', url: 'part-3/intro/intro.html', cache: true}));
		$templateCache.put("cached=part-4/part-4.html", $http({method: 'GET', url: 'part-4/part-4.html', cache: true}));
		$templateCache.put("cached=part-4/intro/intro.html", $http({method: 'GET', url: 'part-4/intro/intro.html', cache: true}));
		$templateCache.put("cached=part-5/part-5.html", $http({method: 'GET', url: 'part-5/part-5.html', cache: true}));
		$templateCache.put("cached=part-5/intro/intro.html", $http({method: 'GET', url: 'part-5/intro/intro.html', cache: true}));
		$templateCache.put("cached=part-6/part-6.html", $http({method: 'GET', url: 'part-6/part-6.html', cache: true}));
		$templateCache.put("cached=part-6/intro/intro.html", $http({method: 'GET', url: 'part-6/intro/intro.html', cache: true}));
		$templateCache.put("cached=part-7/part-7.html", $http({method: 'GET', url: 'part-7/part-7.html', cache: true}));
		$templateCache.put("cached=part-7/intro/intro.html", $http({method: 'GET', url: 'part-7/intro/intro.html', cache: true}));
		$templateCache.put("cached=part-8/part-8.html", $http({method: 'GET', url: 'part-8/part-8.html', cache: true}));
		$templateCache.put("cached=part-8/intro/intro.html", $http({method: 'GET', url: 'part-8/intro/intro.html', cache: true}));
		$templateCache.put("cached=part-9/part-9.html", $http({method: 'GET', url: 'part-9/part-9.html', cache: true}));
		$templateCache.put("cached=part-9/intro/intro.html", $http({method: 'GET', url: 'part-9/intro/intro.html', cache: true}));
		$templateCache.put("cached=part-10/part-10.html", $http({method: 'GET', url: 'part-10/part-10.html', cache: true}));
		$templateCache.put("cached=part-10/intro/intro.html", $http({method: 'GET', url: 'part-10/intro/intro.html', cache: true}));
		$templateCache.put("cached=part-11/part-11.html", $http({method: 'GET', url: 'part-11/part-11.html', cache: true}));
		$templateCache.put("cached=part-11/intro/intro.html", $http({method: 'GET', url: 'part-11/intro/intro.html', cache: true}));

		$rootScope.$state = $state;
		return $rootScope.$stateParams = $stateParams;
	}
]);

/*
 * open and close nav that has no pages
 */
var fakeNav = function() {
	$('.nav > li').on('click touch', function(){
		$(this).siblings().removeClass('active');
		$(this).addClass('active');
		$(this).siblings().find('.sub-nav').slideUp();
		$(this).children('.sub-nav').slideDown();
    });

	$('.nav > li > .sub-nav > li').on('click touch', function(){
		$(this).siblings().removeClass('active');
		$(this).addClass('active');
		$(this).siblings().find('.sub-nav').slideUp();
		$(this).children('.sub-nav').slideDown();
    });
};

app.config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider){
	$urlRouterProvider.otherwise('/');

	/*
	 * Would rather setup a default route to each parts /intro
	 * Users should never land on part parent eg: /part-1
	 */
	$urlRouterProvider.when('/writers-concerns', '/writers-concerns/intro');
	$urlRouterProvider.when('/writers-process', '/writers-process/intro');
	$urlRouterProvider.when('/part-1', '/part-1/intro');
	$urlRouterProvider.when('/part-2', '/part-2/intro');
	$urlRouterProvider.when('/part-3', '/part-3/intro');
	$urlRouterProvider.when('/part-4', '/part-4/intro');
	$urlRouterProvider.when('/part-5', '/part-5/intro');
	$urlRouterProvider.when('/part-6', '/part-6/intro');
	$urlRouterProvider.when('/part-7', '/part-7/intro');
	$urlRouterProvider.when('/part-8', '/part-8/intro');
	$urlRouterProvider.when('/part-9', '/part-9/intro');
	$urlRouterProvider.when('/part-10', '/part-10/intro');
	$urlRouterProvider.when('/part-11', '/part-11/intro');
	$urlRouterProvider.when('/search', '/search/intro');
	$urlRouterProvider.when('/glossary', '/glossary/intro');
	$urlRouterProvider.when('/you', '/you/intro');

	$stateProvider
		/*
		 * HOME
		 */
		.state('home', {
			url: '/',
			templateUrl: 'cached=home/home.html',
        	controller: function($scope, $state, $templateCache) {
        		$('#app-header').on('click', '.tab', function(){
        			$('#app-header .tab').removeClass('active');
        			$(this).addClass('active');
        		});
			}
		})
		/*
		 * WRITERS CONCERNS
		 */
		.state('writers-concerns', {
			url: '/writers-concerns',
			templateUrl: 'cached=writers-concerns/writers-concerns.html',
        	controller: function($templateCache) {
        		fakeNav();
        	}
		})
		.state('writers-concerns.intro', {
			url: '/intro',
			templateUrl: 'cached=writers-concerns/intro/intro.html'
		})
		/*
		 * WRITERS PROCESS
		 */
		.state('writers-process', {
			url: '/writers-process',
			templateUrl: 'cached=writers-process/writers-process.html',
        	controller: function() {
        		fakeNav();
        	}
		})
		.state('writers-process.intro', {
			url: '/intro',
			templateUrl: 'cached=writers-process/intro/intro.html'
		})
		/*
		 * PART 1
		 */
		.state('part-1', {
			url: '/part-1',
			templateUrl: 'cached=part-1/part-1.html',
        	controller: function($scope, $state) {
        		$scope.$on('$stateChangeSuccess', function(event){
					setTimeout(function(){
        				//open and closes part-1 menu
						$('.active').parents('li').addClass('active');
					    $('.nav-left .active').children('.sub-nav').slideDown();

					    $('.nav-left li').on('click', function(){
					        $(this).siblings().find('.sub-nav').slideUp();
					        $(this).children('.sub-nav').slideDown();
					    });
					}, 0);
				});
        	}
		})
		.state('part-1.intro', {
			url: '/intro',
			templateUrl: 'cached=part-1/intro/intro.html'
		})
		.state('part-1.what-will-you-learn', {
			url: '/what-will-you-learn',
			templateUrl: 'part-1/what-will-you-learn/what-will-you-learn.html',
			controller: function($scope) {
				$('.accordion-list .button').on('click touch', function(){
					if($(this).parent().next('.description').is(':visible')){
						$(this).removeClass('open');
						$(this).parent().next('.description').slideUp();
					} else {
						$('.accordion-list .button').removeClass('open');
						$('.accordion-list .description').slideUp();

						$(this).addClass('open');
						$(this).parent().next('.description').slideDown();
					}
				});
			}
		})
		.state('part-1.what-is-composing', {
			url: '/what-is-composing',
			templateUrl: 'part-1/what-is-composing/what-is-composing.html'
		})
		.state('part-1.what-is-rhetoric', {
			url: '/what-is-rhetoric',
			templateUrl: 'part-1/what-is-rhetoric/what-is-rhetoric.html'
		})
		.state('part-1.what-is-rhetoric/audience', {
			url: '/what-is-rhetoric/audience',
			templateUrl: 'part-1/what-is-rhetoric/audience/audience.html'
		})
		.state('part-1.what-is-rhetoric/purpose', {
			url: '/what-is-rhetoric/purpose',
			templateUrl: 'part-1/what-is-rhetoric/purpose/purpose.html'
		})
		.state('part-1.what-is-rhetoric/context', {
			url: '/what-is-rhetoric/context',
			templateUrl: 'part-1/what-is-rhetoric/context/context.html'
		})
		.state('part-1.what-is-rhetoric/strategies', {
			url: '/what-is-rhetoric/strategies',
			templateUrl: 'part-1/what-is-rhetoric/strategies/strategies.html'
		})
		.state('part-1.what-is-rhetoric/how-the-parts-work-together', {
			url: '/what-is-rhetoric/how-the-parts-work-together',
			templateUrl: 'part-1/what-is-rhetoric/how-the-parts-work-together/how-the-parts-work-together.html'
		})
		.state('part-1.rhetoric-and-a-process-for-composing', {
			url: '/rhetoric-and-a-process-for-composing',
			templateUrl: 'part-1/rhetoric-and-a-process-for-composing/rhetoric-and-a-process-for-composing.html'
		})
			.state('part-1.rhetoric-and-a-process-for-composing.learn-it-1', {
				url: '/rhetoric-and-a-process-for-composing/learn-it-1',
				templateUrl: 'part-1/rhetoric-and-a-process-for-composing/learn-it/1/1.html'
			})
		.state('part-1.understanding-your-project-or-assignment', {
			url: '/understanding-your-project-or-assignment',
			templateUrl: 'part-1/understanding-your-project-or-assignment/understanding-your-project-or-assignment.html'
		})
		.state('part-1.understanding-your-project-or-assignment/responding-to-a-written-assignment', {
			url: '/understanding-your-project-or-assignment/responding-to-a-written-assignment',
			templateUrl: 'part-1/understanding-your-project-or-assignment/responding-to-a-written-assignment/responding-to-a-written-assignment.html'
		})
		.state('part-1.understanding-your-project-or-assignment/sample-research-paper-assignment', {
			url: '/understanding-your-project-or-assignment/sample-research-paper-assignment',
			templateUrl: 'part-1/understanding-your-project-or-assignment/sample-research-paper-assignment/sample-research-paper-assignment.html'
		})
		.state('part-1.understanding-your-project-or-assignment/understanding-other-projects', {
			url: '/understanding-your-project-or-assignment/understanding-other-projects',
			templateUrl: 'part-1/understanding-your-project-or-assignment/understanding-other-projects/understanding-other-projects.html'
		})
		/*
		 * PART 2
		 */
		.state('part-2', {
			url: '/part-2',
			templateUrl: 'cached=part-2/part-2.html',
        	controller: function() {
        		fakeNav();
        	}
		})
		.state('part-2.intro', {
			url: '/intro',
			templateUrl: 'cached=part-2/intro/intro.html'
		})
		/*
		 * PART 3
		 */
		.state('part-3', {
			url: '/part-3',
			templateUrl: 'cached=part-3/part-3.html',
        	controller: function() {
        		fakeNav();
        	}
		})
		.state('part-3.intro', {
			url: '/intro',
			templateUrl: 'cached=part-3/intro/intro.html'
		})
		/*
		 * PART 4
		 */
		.state('part-4', {
			url: '/part-4',
			templateUrl: 'cached=part-4/part-4.html',
        	controller: function() {
        		fakeNav();
        	}
		})
		.state('part-4.intro', {
			url: '/intro',
			templateUrl: 'cached=part-4/intro/intro.html'
		})
		/*
		 * PART 5
		 */
		.state('part-5', {
			url: '/part-5',
			templateUrl: 'cached=part-5/part-5.html',
        	controller: function() {
        		fakeNav();
        	}
		})
		.state('part-5.intro', {
			url: '/intro',
			templateUrl: 'cached=part-5/intro/intro.html'
		})
		/*
		 * PART 6
		 */
		.state('part-6', {
			url: '/part-6',
			templateUrl: 'cached=part-6/part-6.html',
        	controller: function() {
        		fakeNav();
        	}
		})
		.state('part-6.intro', {
			url: '/intro',
			templateUrl: 'cached=part-6/intro/intro.html'
		})
		/*
		 * PART 7
		 */
		.state('part-7', {
			url: '/part-7',
			templateUrl: 'cached=part-7/part-7.html',
        	controller: function() {
        		fakeNav();
        	}
		})
		.state('part-7.intro', {
			url: '/intro',
			templateUrl: 'cached=part-7/intro/intro.html'
		})
		/*
		 * PART 8
		 */
		.state('part-8', {
			url: '/part-8',
			templateUrl: 'cached=part-8/part-8.html',
        	controller: function() {
        		fakeNav();
        	}
		})
		.state('part-8.intro', {
			url: '/intro',
			templateUrl: 'cached=part-8/intro/intro.html'
		})
		/*
		 * PART 9
		 */
		.state('part-9', {
			url: '/part-9',
			templateUrl: 'cached=part-9/part-9.html',
        	controller: function() {
        		fakeNav();
        	}
		})
		.state('part-9.intro', {
			url: '/intro',
			templateUrl: 'cached=part-9/intro/intro.html'
		})
		/*
		 * PART 10
		 */
		.state('part-10', {
			url: '/part-10',
			templateUrl: 'cached=part-10/part-10.html',
        	controller: function() {
        		fakeNav();
        	}
		})
		.state('part-10.intro', {
			url: '/intro',
			templateUrl: 'cached=part-10/intro/intro.html'
		})
		/*
		 * PART 11
		 */
		.state('part-11', {
			url: '/part-11',
			templateUrl: 'cached=part-11/part-11.html',
        	controller: function() {
        		fakeNav();
        	}
		})
		.state('part-11.intro', {
			url: '/intro',
			templateUrl: 'cached=part-11/intro/intro.html'
		})
		/*
		 * SEARCH
		 */
		.state('search', {
			url: '/search',
			templateUrl: 'search/search.html'
		})
		.state('search.intro', {
			url: '/intro',
			templateUrl: 'search/intro/intro.html'
		})
		/*
		 * GLOSSARY
		 */
		.state('glossary', {
			url: '/glossary',
			templateUrl: 'glossary/glossary.html'
		})
		.state('glossary.intro', {
			url: '/intro',
			templateUrl: 'glossary/intro/intro.html'
		})
		/*
		 * YOU
		 */
		.state('you', {
			url: '/you',
			templateUrl: 'you/you.html'
		})
		.state('you.intro', {
			url: '/intro',
			templateUrl: 'you/intro/intro.html'
		});
}]);

/*
 * jQuery!
 */
$(document).ready(function() {
	/*
	 * preload images
	 */
	function preload(arrayOfImages) {
		$(arrayOfImages).each(function(){
			$('<img/>')[0].src = this;
		});
	}

	preload([
		'../../home/assets/img/cover-colorful-swirls.jpg',
		'../../writers-concerns/intro/assets/img/background-image.jpg',
		'../../writers-process/intro/assets/img/background-image.jpg',
		'../../part-1/intro/assets/img/background-image.jpg',
		'../../part-2/intro/assets/img/background-image.jpg',
		'../../part-3/intro/assets/img/background-image.jpg',
		'../../part-4/intro/assets/img/background-image.jpg',
		'../../part-5/intro/assets/img/background-image.jpg',
		'../../part-6/intro/assets/img/background-image.jpg',
		'../../part-7/intro/assets/img/background-image.jpg',
		'../../part-8/intro/assets/img/background-image.jpg',
		'../../part-9/intro/assets/img/background-image.jpg',
		'../../part-10/intro/assets/img/background-image.jpg',
		'../../part-11/intro/assets/img/background-image.jpg',
		'../../search/assets/left-nav.png',
		'../../search/assets/content.jpg',
		'../../glossary/assets/left-nav.png',
		'../../glossary/assets/content.png',
		'../../you/assets/left-nav.png',
		'../../you/assets/content.png'
	]);
	/*
	 * adds focus to left nav
	 */
	$('.main-nav').on('click touch', function(){
		setTimeout(function(){
			$('.part-view .nav > li:eq(0) > a:eq(0)').focus();
		}, 0);
	});
	/*
	 * main nav hover states
	 */	 
	setTimeout(function(){
		$('.main-nav').on({
			mouseenter: function(){
				$('.main-nav-hover').addClass('open');
			},
			mouseleave: function(){
				$('.main-nav-hover').removeClass('open');
			}
		});

		$('.main-nav .tab').on({
			mouseenter: function(){
				$('.main-nav-hover').addClass($('a', this).attr('class'));
				$('.main-nav-hover .full-description').text($('a', this).attr('data-title'));
			},
			mouseleave: function(){
				$('.main-nav-hover').removeClass($('a', this).attr('class'));
				$('.main-nav-hover .full-description').text('');
			}
		});	
	}, 0);
});
