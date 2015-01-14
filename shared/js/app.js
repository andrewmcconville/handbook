var app = angular.module('handbook', ['ui.router', 'ngAnimate']);

app.run([
	"$rootScope", "$state", "$stateParams", function($rootScope, $state, $stateParams) {
		$rootScope.$state = $state;
		return $rootScope.$stateParams = $stateParams;
	}
]);

app.config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider){
	$urlRouterProvider.otherwise('/');

	$stateProvider
		/*
		 * WRITERS CONCERNS
		 */
		.state('writers-concerns', {
			url: '/writers-concerns',
			templateUrl: 'writers-concerns/writers-concerns.html'
		})
		.state('writers-concerns.intro', {
			url: '/',
			templateUrl: 'writers-concerns/intro/intro.html'
		})
		/*
		 * WRITERS PROCESS
		 */
		.state('writers-process', {
			url: '/writers-process',
			templateUrl: 'writers-process/writers-process.html'
		})
		.state('writers-process.intro', {
			url: '/',
			templateUrl: 'writers-process/intro/intro.html'
		})
		/*
		 * HOME
		 */
		.state('home', {
			url: '/',
			templateUrl: 'home/home.html',
        	controller: function($scope, $state) {
        		$('#app-header').on('click', '.tab', function(){
        			$('#app-header .tab').removeClass('active');
        			$(this).addClass('active');
        		});
			}
		})
		/*
		 * PART 1
		 */
		.state('part-1', {
			url: '/part-1',
			templateUrl: 'part-1/part-1.html',
        	controller: function($scope, $state) {
        		$scope.$on('$stateChangeSuccess', function(event){
					//$state.go('part-1.intro');
					setTimeout(function(){
						$('.active').parents('li').addClass('active');
					    $('.nav-left .active').children('.sub-nav').slideDown();

					    $('.nav-left li').on('click', function(){
					        $(this).siblings().find('.sub-nav').slideUp();
					        $(this).children('.sub-nav').slideDown();
					    });

					}, 0);
				});

				//$state.go('part-1.intro');

				$scope.changeState = function () {
					//$state.go('part-1.intro');
				};
        	}
		})
		.state('part-1.intro', {
			url: '/',
			templateUrl: 'part-1/intro/intro.html'
		})
		.state('part-1.what-will-you-learn', {
			url: '/what-will-you-learn',
			templateUrl: 'part-1/what-will-you-learn/what-will-you-learn.html'
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
			templateUrl: 'part-2/part-2.html'
		})
		.state('part-2.intro', {
			url: '/',
			templateUrl: 'part-2/intro/intro.html'
		})
		/* 
		 * PART 3
		 */
		.state('part-3', {
			url: '/part-3',
			templateUrl: 'part-3/part-3.html'
		})
		.state('part-3.intro', {
			url: '/',
			templateUrl: 'part-3/intro/intro.html'
		})
		/* 
		 * PART 4
		 */
		.state('part-4', {
			url: '/part-4',
			templateUrl: 'part-4/part-4.html'
		})
		.state('part-4.intro', {
			url: '/',
			templateUrl: 'part-4/intro/intro.html'
		})
		/* 
		 * PART 5
		 */
		.state('part-5', {
			url: '/part-5',
			templateUrl: 'part-5/part-5.html'
		})
		.state('part-5.intro', {
			url: '/',
			templateUrl: 'part-5/intro/intro.html'
		})
		/* 
		 * PART 6
		 */
		.state('part-6', {
			url: '/part-6',
			templateUrl: 'part-6/part-6.html'
		})
		.state('part-6.intro', {
			url: '/',
			templateUrl: 'part-6/intro/intro.html'
		})
		/* 
		 * PART 7
		 */
		.state('part-7', {
			url: '/part-7',
			templateUrl: 'part-7/part-7.html'
		})
		.state('part-7.intro', {
			url: '/',
			templateUrl: 'part-7/intro/intro.html'
		})
		/* 
		 * PART 8
		 */
		.state('part-8', {
			url: '/part-8',
			templateUrl: 'part-8/part-8.html'
		})
		.state('part-8.intro', {
			url: '/',
			templateUrl: 'part-8/intro/intro.html'
		})
		/* 
		 * PART 9
		 */
		.state('part-9', {
			url: '/part-9',
			templateUrl: 'part-9/part-9.html'
		})
		.state('part-9.intro', {
			url: '/',
			templateUrl: 'part-9/intro/intro.html'
		})
		/* 
		 * PART 10
		 */
		.state('part-10', {
			url: '/part-10',
			templateUrl: 'part-10/part-10.html'
		})
		.state('part-10.intro', {
			url: '/',
			templateUrl: 'part-10/intro/intro.html'
		})
		/* 
		 * ACADEMIC ENGLISH
		 */
		.state('academic-english', {
			url: '/academic-english',
			templateUrl: 'academic-english/academic-english.html'
		})
		.state('academic-english.intro', {
			url: '/',
			templateUrl: 'academic-english/intro/intro.html'
		})
		/* 
		 * SEARCH
		 */
		.state('search', {
			url: '/search',
			templateUrl: 'search/search.html'
		})
		.state('search.intro', {
			url: '/',
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
			url: '/',
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
			url: '/',
			templateUrl: 'you/intro/intro.html'
		});
}]);

/*
 * cache angular templates
 */
app.run(function($templateCache, $http) {
	$http.get('writers-concerns/writers-concerns.html', {cache:$templateCache});
	$http.get('writers-concerns/intro/intro.html', {cache:$templateCache});
	$http.get('writers-process/writers-process.html', {cache:$templateCache});
	$http.get('writers-process/intro/intro.html', {cache:$templateCache});
	$http.get('part-1/part-1.html', {cache:$templateCache});
	$http.get('part-1/intro/intro.html', {cache:$templateCache});
	$http.get('part-2/part-2.html', {cache:$templateCache});
	$http.get('part-2/intro/intro.html', {cache:$templateCache});
	$http.get('part-3/part-3.html', {cache:$templateCache});
	$http.get('part-3/intro/intro.html', {cache:$templateCache});
	$http.get('part-4/part-4.html', {cache:$templateCache});
	$http.get('part-4/intro/intro.html', {cache:$templateCache});
	$http.get('part-5/part-5.html', {cache:$templateCache});
	$http.get('part-5/intro/intro.html', {cache:$templateCache});
	$http.get('part-6/part-6.html', {cache:$templateCache});
	$http.get('part-6/intro/intro.html', {cache:$templateCache});
	$http.get('part-7/part-7.html', {cache:$templateCache});
	$http.get('part-7/intro/intro.html', {cache:$templateCache});
	$http.get('part-8/part-8.html', {cache:$templateCache});
	$http.get('part-8/intro/intro.html', {cache:$templateCache});
	$http.get('part-9/part-9.html', {cache:$templateCache});
	$http.get('part-9/intro/intro.html', {cache:$templateCache});
	$http.get('part-10/part-10.html', {cache:$templateCache});
	$http.get('part-10/intro/intro.html', {cache:$templateCache});
});

/*
 * preload images
 */
$(document).ready(function() {
	function preload(arrayOfImages) {
		$(arrayOfImages).each(function(){
			$('<img/>')[0].src = this;
		});
	}

	preload([
		'/writers-concerns/intro/assets/img/background-image.jpg',
		'/writers-process/intro/assets/img/background-image.jpg',
		'/part-1/intro/assets/img/background-image.jpg',
		'/part-2/intro/assets/img/background-image.jpg',
		'/part-3/intro/assets/img/background-image.jpg',
		'/part-4/intro/assets/img/background-image.jpg',
		'/part-5/intro/assets/img/background-image.jpg',
		'/part-6/intro/assets/img/background-image.jpg',
		'/part-7/intro/assets/img/background-image.jpg',
		'/part-8/intro/assets/img/background-image.jpg',
		'/part-9/intro/assets/img/background-image.jpg'
	]);
});