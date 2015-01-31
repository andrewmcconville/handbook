angular
	.module('handbook')
	.controller('homeCtrl', ['$scope', function($scope) {
			$scope.hasUsername = false;
			$scope.username;

			$('#app-header').on('click', '.tab', function(){
				$('#app-header .tab').removeClass('active');
				$(this).addClass('active');
			});
		}])