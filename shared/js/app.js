var app = angular.module('handbook', ['ui.router', 'ngAnimate', 'ui.sortable', 'handbook-directives']);

app.run([
	"$rootScope", "$state", "$stateParams", function($rootScope, $state, $stateParams) {
		$rootScope.$state = $state;
		return $rootScope.$stateParams = $stateParams;
	}
]);

app.config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider){
	$urlRouterProvider.otherwise('/');

	/*
	 * Would rather setup a default route to each parts /intro
	 * Users should never land on part parent eg: /part-1
	 */
	$urlRouterProvider.when('/writers-concerns', '/writers-concerns/intro');
	$urlRouterProvider.when('/writers-process', '/writers-process/intro');
	$urlRouterProvider.when('/part-1', '/part-1/intro');
	$urlRouterProvider.when('/part-1/rhetoric-and-a-process-for-composing', '/part-1/rhetoric-and-a-process-for-composing/learn-it-1');
	$urlRouterProvider.when('/part-1/understanding-your-project-or-assignment/understanding-a-class-assignment', '/part-1/understanding-your-project-or-assignment/understanding-a-class-assignment/learn-it-1');
	$urlRouterProvider.when('/part-1/understanding-your-project-or-assignment/understanding-other-projects', '/part-1/understanding-your-project-or-assignment/understanding-other-projects/learn-it-1');
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
	$urlRouterProvider.when('/part-11/punctuation/commas/to-separate-words-in-lists', '/part-11/punctuation/commas/to-separate-words-in-lists/learn-it-1');
	$urlRouterProvider.when('/search', '/search/intro');
	$urlRouterProvider.when('/glossary', '/glossary/intro');
	$urlRouterProvider.when('/you', '/you/intro');

	$stateProvider
		/*
		 * HOME
		 */
		.state('home', {
			url: '/',
			templateUrl: 'home/home.html',
        	controller: 'homeCtrl'
		})
		/*
		 * WRITERS CONCERNS
		 */
		.state('writers-concerns', {
			url: '/writers-concerns',
			templateUrl: 'writers-concerns/writers-concerns.html'
		})
		.state('writers-concerns.intro', {
			url: '/intro',
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
			url: '/intro',
			templateUrl: 'writers-process/intro/intro.html'
		})
		/*
		 * PART 1
		 */
		.state('part-1', {
			url: '/part-1',
			templateUrl: 'part-1/part-1.html'
		})
		.state('part-1.intro', {
			url: '/intro',
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
		.state('part-1.rhetoric-and-a-process-for-composing.learn-it-1', {
			url: '/learn-it-1',
			templateUrl: 'part-1/rhetoric-and-a-process-for-composing/learn-it/1/1.html'
		})
		.state('part-1.rhetoric-and-a-process-for-composing.try-it-1', {
			url: '/try-it-1',
			templateUrl: 'part-1/rhetoric-and-a-process-for-composing/try-it/1/1.html',
			controller: 'part1RhetoricAndAProcessForComposingTryIt1'
		})
		.state('part-1.understanding-your-project-or-assignment', {
			url: '/understanding-your-project-or-assignment',
			templateUrl: 'part-1/understanding-your-project-or-assignment/understanding-your-project-or-assignment.html'
		})
		.state('part-1.understanding-your-project-or-assignment/understanding-a-class-assignment', {
			url: '/understanding-your-project-or-assignment/understanding-a-class-assignment',
			templateUrl: 'part-1/understanding-your-project-or-assignment/understanding-a-class-assignment/understanding-a-class-assignment.html'
		})
		.state('part-1.understanding-your-project-or-assignment/understanding-a-class-assignment.learn-it-1', {
			url: '/learn-it-1',
			templateUrl: 'part-1/understanding-your-project-or-assignment/understanding-a-class-assignment/learn-it/1/1.html'
		})
		.state('part-1.understanding-your-project-or-assignment/understanding-a-class-assignment.learn-it-2', {
			url: '/learn-it-2',
			templateUrl: 'part-1/understanding-your-project-or-assignment/understanding-a-class-assignment/learn-it/2/2.html',
			controller: 'part1UnderstandingYourProjectOrAssignmentUnderstandingAClassAssignmentLearnIt2'
		})
		.state('part-1.understanding-your-project-or-assignment/understanding-a-class-assignment.learn-it-3', {
			url: '/learn-it-3',
			templateUrl: 'part-1/understanding-your-project-or-assignment/understanding-a-class-assignment/learn-it/3/3.html'
		})
		.state('part-1.understanding-your-project-or-assignment/understanding-a-class-assignment.try-it-1', {
			url: '/try-it-1',
			templateUrl: 'part-1/understanding-your-project-or-assignment/understanding-a-class-assignment/try-it/1/1.html',
			controller: 'part1UnderstandingYourProjectOrAssignmentUnderstandingAClassAssignmentTryIt1'
		})
		.state('part-1.understanding-your-project-or-assignment/understanding-other-projects', {
			url: '/understanding-your-project-or-assignment/understanding-other-projects',
			templateUrl: 'part-1/understanding-your-project-or-assignment/understanding-other-projects/understanding-other-projects.html'
		})
		.state('part-1.understanding-your-project-or-assignment/understanding-other-projects.learn-it-1', {
			url: '/learn-it-1',
			templateUrl: 'part-1/understanding-your-project-or-assignment/understanding-other-projects/learn-it/1/1.html'
		})
		.state('part-1.understanding-your-project-or-assignment/understanding-other-projects.learn-it-2', {
			url: '/learn-it-2',
			templateUrl: 'part-1/understanding-your-project-or-assignment/understanding-other-projects/learn-it/2/2.html',
			controller: 'part1UnderstandingYourProjectOrAssignmentUnderstandingOtherProjectsLearnIt2'
		})
		/*
		 * PART 2
		 */
		.state('part-2', {
			url: '/part-2',
			templateUrl: 'part-2/part-2.html'
		})
		.state('part-2.intro', {
			url: '/intro',
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
			url: '/intro',
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
			url: '/intro',
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
			url: '/intro',
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
			url: '/intro',
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
			url: '/intro',
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
			url: '/intro',
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
			url: '/intro',
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
			url: '/intro',
			templateUrl: 'part-10/intro/intro.html'
		})
		/*
		 * PART 11
		 */
		.state('part-11', {
			url: '/part-11',
			templateUrl: 'part-11/part-11.html'
		})
		.state('part-11.intro', {
			url: '/intro',
			templateUrl: 'part-11/intro/intro.html'
		})
		.state('part-11.what-will-you-learn', {
			url: '/what-will-you-learn',
			templateUrl: 'part-11/what-will-you-learn/what-will-you-learn.html'
		})
		.state('part-11.grammar', {
			url: '/grammar',
			templateUrl: 'shared/coming-soon/coming-soon.html'
		})
		.state('part-11.punctuation', {
			url: '/punctuation',
			templateUrl: 'part-11/punctuation/punctuation.html'
		})
		.state('part-11.punctuation/commas', {
			url: '/punctuation/commas',
			templateUrl: 'part-11/punctuation/commas/commas.html'
		})
		.state('part-11.punctuation/commas/to-separate-words-in-lists', {
			url: '/punctuation/commas/to-separate-words-in-lists',
			templateUrl: 'part-11/punctuation/commas/to-separate-words-in-lists/to-separate-words-in-lists.html'
		})
		.state('part-11.punctuation/commas/to-separate-words-in-lists.learn-it-1', {
			url: '/learn-it-1',
			templateUrl: 'part-11/punctuation/commas/to-separate-words-in-lists/learn-it/1/1.html'
		})
		.state('part-11.punctuation/commas/to-separate-words-in-lists.learn-it-2', {
			url: '/learn-it-2',
			templateUrl: 'part-11/punctuation/commas/to-separate-words-in-lists/learn-it/2/2.html'
		})
		.state('part-11.punctuation/commas/to-separate-words-in-lists.learn-it-3', {
			url: '/learn-it-3',
			templateUrl: 'part-11/punctuation/commas/to-separate-words-in-lists/learn-it/3/3.html'
		})
		.state('part-11.punctuation/commas/to-separate-words-in-lists.learn-it-4', {
			url: '/learn-it-4',
			templateUrl: 'part-11/punctuation/commas/to-separate-words-in-lists/learn-it/4/4.html'
		})
		.state('part-11.punctuation/commas/to-separate-words-in-lists.learn-it-5', {
			url: '/learn-it-5',
			templateUrl: 'part-11/punctuation/commas/to-separate-words-in-lists/learn-it/5/5.html'
		})
		.state('part-11.punctuation/commas/to-separate-words-in-lists.try-it-1', {
			url: '/try-it-1',
			templateUrl: 'part-11/punctuation/commas/to-separate-words-in-lists/try-it/1/1.html'
		})
		.state('part-11.punctuation/commas/to-separate-words-in-lists.try-it-2', {
			url: '/try-it-2',
			templateUrl: 'part-11/punctuation/commas/to-separate-words-in-lists/try-it/2/2.html'
		})
		.state('part-11.punctuation/commas/to-separate-words-in-lists.try-it-3', {
			url: '/try-it-3',
			templateUrl: 'part-11/punctuation/commas/to-separate-words-in-lists/try-it/3/3.html'
		})
		.state('part-11.punctuation/commas/to-separate-words-in-lists.try-it-4', {
			url: '/try-it-4',
			templateUrl: 'part-11/punctuation/commas/to-separate-words-in-lists/try-it/4/4.html'
		})
		.state('part-11.punctuation/commas/to-separate-words-in-lists.try-it-5', {
			url: '/try-it-5',
			templateUrl: 'part-11/punctuation/commas/to-separate-words-in-lists/try-it/5/5.html'
		})
		.state('part-11.mechanics', {
			url: '/mechanics',
			templateUrl: 'shared/coming-soon/coming-soon.html'
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
