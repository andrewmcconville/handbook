angular
	.module('handbook')
	.controller('homeCtrl', ['$scope', function($scope) {
		$('.input-name').focus();
		$scope.hasUsername = false;

		//adds focus to left nav
		$scope.focusLeftNav = function(){
			$('.part-view .nav > li:eq(0) > a:eq(0)').focus();
		};

		//used to animate active main nav tab
		$('#app-header').on('click', '.tab', function(){
			$('#app-header .tab').removeClass('active');
			$(this).addClass('active');
		});
	}])
	.controller('part1RhetoricAndAProcessForComposingTry1', ['$scope', function($scope) {
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
	}]);
