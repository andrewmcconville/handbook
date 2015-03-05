angular
	.module('handbook')
	.controller('homeCtrl', ['$scope', function($scope) {
		$('.input-name').focus();
		$scope.hasUsername = false;

		/*
		 * adds focus to left nav
		 */
		$scope.focusLeftNav = function(){
			$('.part-view .nav > li:eq(0) > a:eq(0)').focus();
		};

		/*
		 * used to animate active main nav tab
		 */
		$('#app-header').on('click', '.tab', function(){
			$('#app-header .tab').removeClass('active');
			$(this).addClass('active');
		});
	}]);
