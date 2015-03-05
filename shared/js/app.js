var app = angular.module('handbook', ['ui.router', 'ngAnimate', 'ui.sortable', 'handbook-directives']);

app.run([
	"$rootScope", "$state", "$stateParams", function($rootScope, $state, $stateParams) {
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
			templateUrl: 'writers-concerns/writers-concerns.html',
        	controller: function() {
        		fakeNav();
        	}
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
			templateUrl: 'writers-process/writers-process.html',
        	controller: function() {
        		fakeNav();
        	}
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
			templateUrl: 'part-1/part-1.html',
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
				controller: function($scope) {

					$scope.reset = function() {
						$scope.popup = 0;
						
						$scope.leftList = [
							{title:'Asking questions', class:'draggable drag-1'},
							{title:'Drafting a paper', class:'draggable drag-2'},
							{title:'Revising', class:'draggable drag-3'},
							{title:'Understanding your project', class:'draggable drag-4'},
							{title:'Shaping your project for others', class:'draggable drag-5'},
							{title:'Polishing', class:'draggable drag-6'},
							{title:'Getting feedback', class:'draggable drag-7'},
							{title:'Getting started', class:'draggable drag-8'}
						];

						$scope.drop = [];
					}

					$scope.reset();

					$scope.sortableOptions = {
						connectWith: '.item-container',
						revert: 300
					};

					$scope.getAnswer = function() {
						if($scope.drop.length == 8 &&
							$scope.drop[0].title == 'Understanding your project' &&
							$scope.drop[1].title == 'Getting started' &&
							$scope.drop[2].title == 'Asking questions' &&
							$scope.drop[3].title == 'Shaping your project for others' &&
							$scope.drop[4].title == 'Drafting a paper' &&
							$scope.drop[5].title == 'Getting feedback' &&
							$scope.drop[6].title == 'Revising' &&
							$scope.drop[7].title == 'Polishing') {
							$scope.popup = 1;
						} else {
							$scope.popup = 2;							
						}
					}
				}
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
					controller: function($scope) {
						$scope.togglePopups = function(i){
							$scope.radioState = i;
							$scope.noteIsShowing = false;
						};
					}
				})
				.state('part-1.understanding-your-project-or-assignment/understanding-a-class-assignment.learn-it-3', {
					url: '/learn-it-3',
					templateUrl: 'part-1/understanding-your-project-or-assignment/understanding-a-class-assignment/learn-it/3/3.html'
				})
				.state('part-1.understanding-your-project-or-assignment/understanding-a-class-assignment.try-it-1', {
					url: '/try-it-1',
					templateUrl: 'part-1/understanding-your-project-or-assignment/understanding-a-class-assignment/try-it/1/1.html',
					controller: function($scope) {
						$scope.popup = 0;
						$scope.answers = []

						$scope.answers[0] = {};
						$scope.answers[0].value = 0;
						$scope.answers[0].isCorrect = false;
						$scope.track1 = {};
						$scope.track1.drop0 = [{title:'purpose', class:'draggable draggable-1'}];
						$scope.track1.drop1 = [];
						$scope.track1.drop2 = [];
						$scope.track1.drop3 = [];
						$scope.track1.drop4 = [];
						$scope.track1.drop5 = [];
						$scope.track1.drop6 = [];
						$scope.track1.drop7 = [];

						$scope.sortableOptions1 = {
							connectWith: '.track-1-drop-area',
							axis: 'y',
							revert: 150,
							tolerance: 'pointer',
							update : function(e, ui) {
								if(ui.item.sortable.droptarget.hasClass('drop-area-' + $scope.answers[1].value)) {
									ui.item.sortable.cancel();
								}
							},
							stop: function() {
								for(var prop in $scope.track1) {
									if($scope.track1[prop].length > 0) {
										$scope.answers[0].value = prop[4];
										if($scope.answers[0].value == 3 || $scope.answers[0].value == 4 ) {
											$scope.answers[0].isCorrect = true;
										} else {
											$scope.answers[0].isCorrect = false;
										}
									}
								}
							}
						}

						$scope.answers[1] = {};
						$scope.answers[1].value = 0;
						$scope.answers[1].isCorrect = false;
						$scope.track2 = {};
						$scope.track2.drop0 = [{title:'purpose', class:'draggable draggable-2'}];
						$scope.track2.drop1 = [];
						$scope.track2.drop2 = [];
						$scope.track2.drop3 = [];
						$scope.track2.drop4 = [];
						$scope.track2.drop5 = [];
						$scope.track2.drop6 = [];
						$scope.track2.drop7 = [];

						$scope.sortableOptions2 = {
							connectWith: '.track-2-drop-area',
							axis: 'y',
							revert: 150,
							tolerance: 'pointer',
							update : function(e, ui) {
								if(ui.item.sortable.droptarget.hasClass('drop-area-' + $scope.answers[0].value)) {
									ui.item.sortable.cancel();
								}
							},
							stop: function() {
								for(var prop in $scope.track1) {
									if($scope.track2[prop].length > 0) {
										$scope.answers[1].value = prop[4];
										if($scope.answers[1].value == 3 || $scope.answers[1].value == 4 ) {
											$scope.answers[1].isCorrect = true;
										} else {
											$scope.answers[1].isCorrect = false;
										}
									}
								}
							}
						}

						$scope.getAnswer = function() {
							if($scope.answers[0].isCorrect && $scope.answers[1].isCorrect) {
								$scope.popup = 1;
							} else if($scope.answers[0].isCorrect && !$scope.answers[1].isCorrect) {
								if($scope.answers[0].value == 3) {
									$scope.popup = 2;
									//alert('1 correct (' + $scope.answers[0].value + '), 2 incorrect');
								}
								if($scope.answers[0].value == 4) {
									$scope.popup = 3;
									//alert('1 correct (' + $scope.answers[0].value +'), 2 incorrect');
								}								
							} else if(!$scope.answers[0].isCorrect && $scope.answers[1].isCorrect) {
								if($scope.answers[1].value == 3) {
									$scope.popup = 2;
									//alert('1 incorrect, 2 correct (' + $scope.answers[1].value + ')');
								}
								if($scope.answers[1].value == 4) {
									$scope.popup = 3;
									//alert('1 incorrect, 2 correct (' + $scope.answers[1].value + ')');
								}
							} else {
								$scope.popup = 4;
								//alert('both incorrect');
							}
						}
					}
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
        			controller: function($scope) {
						$scope.radioState = 0;
					}
				})
		/*
		 * PART 2
		 */
		.state('part-2', {
			url: '/part-2',
			templateUrl: 'part-2/part-2.html',
        	controller: function() {
        		fakeNav();
        	}
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
			templateUrl: 'part-3/part-3.html',
        	controller: function() {
        		fakeNav();
        	}
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
			templateUrl: 'part-4/part-4.html',
        	controller: function() {
        		fakeNav();
        	}
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
			templateUrl: 'part-5/part-5.html',
        	controller: function() {
        		fakeNav();
        	}
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
			templateUrl: 'part-6/part-6.html',
        	controller: function() {
        		fakeNav();
        	}
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
			templateUrl: 'part-7/part-7.html',
        	controller: function() {
        		fakeNav();
        	}
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
			templateUrl: 'part-8/part-8.html',
        	controller: function() {
        		fakeNav();
        	}
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
			templateUrl: 'part-9/part-9.html',
        	controller: function() {
        		fakeNav();
        	}
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
			templateUrl: 'part-10/part-10.html',
        	controller: function() {
        		fakeNav();
        	}
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
			templateUrl: 'part-11/part-11.html',
        	controller: function() {
        		fakeNav();
        	}
		})
		.state('part-11.intro', {
			url: '/intro',
			templateUrl: 'part-11/intro/intro.html'
		})
		.state('part-11.what-will-you-learn', {
			url: '/what-will-you-learn',
			templateUrl: 'part-11/what-will-you-learn/what-will-you-learn.html'
		})
		.state('part-11.punctuation', {
			url: '/punctuation',
			templateUrl: 'part-11/punctuation/punctuation.html',
			controller: function($scope) {
			}
		})
		.state('part-11.punctuation/commas', {
			url: '/punctuation/commas',
			templateUrl: 'part-11/punctuation/commas/commas.html',
			controller: function($scope) {
			}
		})
		.state('part-11.punctuation/commas/to-separate-words-in-lists', {
			url: '/punctuation/commas/to-separate-words-in-lists',
			templateUrl: 'part-11/punctuation/commas/to-separate-words-in-lists/to-separate-words-in-lists.html',
			controller: function($scope) {
			}
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
