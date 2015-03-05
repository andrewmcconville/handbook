(function(){
	var app = angular.module('handbook-directives', []);

	/* 
	 * open and closes part-1 menu
	 */
	app.directive('navLeft', function(){
		return {
			restrict: 'A',
			controller: ['$scope', '$state', function($scope, $state){
        		$scope.$on('$stateChangeSuccess', function(){
					setTimeout(function(){
						$('.active').parents('li').addClass('active');
						$('.nav-left .active').children('.sub-nav').slideDown();

						$('.nav-left li').on('click touch', function(){
						    $(this).siblings().find('.sub-nav').slideUp();
						    $(this).children('.sub-nav').slideDown();
						});
					}, 0);
				});
			}]
		};
	});


	/*
	 * open and close nav that has no pages
	 */
	app.directive('fakeNav', function() {
		return {
			restrict: 'A',
			controller: function(){
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
			}
		};
	});


	/*
	 * open and close what will you learn triangles
	 */
	app.directive('accordionList', function() {
		return {
			restrict: 'A',
			controller: function() {
				$('.accordion-list .btn-expander').on('click touch', function(){
					if($(this).parent().next('.description').is(':visible')){
						$(this).removeClass('open');
						$(this).parent().next('.description').slideUp();
					} else {
						$('.accordion-list .btn-expander').removeClass('open');
						$('.accordion-list .description').slideUp();

						$(this).addClass('open');
						$(this).parent().next('.description').slideDown();
					}
				});
			}
		};
	});


	/*
	 * main nav hover states
	 */
	app.directive('mainNavHover', function() {
		return {
			restrict: 'A',
			controller: function() {
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
			}
		};
	});

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
			},
			link: function (scope, element, attr) {
				element.on('click', function (e) {
					e.stopPropagation();
				});
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
})();