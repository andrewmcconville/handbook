angular
	.module('handbook')
	.controller('homeCtrl', ['$scope', function($scope) {
		$scope.hasUsername = false;

		/*
		 * used to animate active main nav tab
		 */
		$('#app-header').on('click', '.tab', function(){
			$('#app-header .tab').removeClass('active');
			$(this).addClass('active');
		});
	}]);
