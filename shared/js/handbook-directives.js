/*
 * Directives
 */
(function(){
	var app = angular.module('handbook-directives', []);

	/*
	 * open and close what will you learn triangles
	 */
	app.directive('accordionList', function() {
		return {
			restrict: 'A',
			controller: ['$scope', function($scope) {
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
			}]
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