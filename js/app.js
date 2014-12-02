var app = angular.module('handbook', ['ui.router', 'ngAnimate']);

app.config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider){
	$urlRouterProvider.otherwise('/');

	$stateProvider
		.state('home', {
			url: '/',
			templateUrl: 'partials/home.html'
		})
		/*
		 * PART 1
		 */
		.state('part-1', {
			url: '/part-1',
			templateUrl: 'partials/part-1/part-1.html',
        	controller: function($scope) {
        		$scope.$on('$stateChangeSuccess', function(event){
					setTimeout(function(){

						$('.active').parents('li').addClass('active');
					    $('.nav-left .active').children('.sub-nav').slideDown();

					    $('.nav-left li').on('click', function(){
					        $(this).siblings().find('.sub-nav').slideUp();
					        $(this).children('.sub-nav').slideDown();
					    });

					}, 1);
				});
        	}
		})
		.state('part-1.intro', {
			url: '/',
			templateUrl: 'partials/part-1/intro.html'
		})
		.state('part-1.what-will-you-learn', {
			url: '/what-will-you-learn',
			templateUrl: 'partials/part-1/what-will-you-learn/what-will-you-learn.html'
		})
		.state('part-1.what-is-composing', {
			url: '/what-is-composing',
			templateUrl: 'partials/part-1/what-is-composing/what-is-composing.html'
		})
		.state('part-1.what-is-rhetoric', {
			url: '/what-is-rhetoric',
			templateUrl: 'partials/part-1/what-is-rhetoric/what-is-rhetoric.html'
		})
			.state('part-1.what-is-rhetoric/audience', {
				url: '/what-is-rhetoric/audience',
				templateUrl: 'partials/part-1/what-is-rhetoric/audience/audience.html'
			})
			.state('part-1.what-is-rhetoric/purpose', {
				url: '/what-is-rhetoric/purpose',
				templateUrl: 'partials/part-1/what-is-rhetoric/purpose/purpose.html'
			})
			.state('part-1.what-is-rhetoric/context', {
				url: '/what-is-rhetoric/context',
				templateUrl: 'partials/part-1/what-is-rhetoric/context/context.html'
			})
			.state('part-1.what-is-rhetoric/strategies', {
				url: '/what-is-rhetoric/strategies',
				templateUrl: 'partials/part-1/what-is-rhetoric/strategies/strategies.html'
			})
			.state('part-1.what-is-rhetoric/how-the-parts-work-together', {
				url: '/what-is-rhetoric/how-the-parts-work-together',
				templateUrl: 'partials/part-1/what-is-rhetoric/how-the-parts-work-together/how-the-parts-work-together.html'
			})
		.state('part-1.rhetoric-and-a-process-for-composing', {
			url: '/rhetoric-and-a-process-for-composing',
			templateUrl: 'partials/part-1/rhetoric-and-a-process-for-composing/rhetoric-and-a-process-for-composing.html'
		})
		.state('part-1.understanding-your-project-or-assignment', {
			url: '/understanding-your-project-or-assignment',
			templateUrl: 'partials/part-1/understanding-your-project-or-assignment/understanding-your-project-or-assignment.html'
		})
		/* 
		 * PART 2
		 */
		.state('part-2', {
			url: '/part-2',
			templateUrl: 'partials/part-2/part-2.html'
		});
}]);