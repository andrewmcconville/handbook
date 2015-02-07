angular
	.module('handbook')
	.controller('homeCtrl', ['$scope', function($scope) {
		$scope.hasUsername = false;

		$('#app-header').on('click', '.tab', function(){
			$('#app-header .tab').removeClass('active');
			$(this).addClass('active');
		});
	}]);
