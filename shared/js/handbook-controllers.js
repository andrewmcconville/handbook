angular
	.module('handbook')


	/*
	 * All pages
	 */
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


	/*
	 * Part 1
	 * Rhetoric and a process for composing
	 * Try It 1
	 */
	.controller('part1RhetoricAndAProcessForComposingTryIt1', ['$scope', function($scope) {
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
	}])


	/*
	 * Part 1
	 * Understanding your project or assignment
	 * Understanding a class assignment
	 * Learn It 2
	 */
	.controller('part1UnderstandingYourProjectOrAssignmentUnderstandingAClassAssignmentLearnIt2', ['$scope', function($scope) {
		$scope.togglePopups = function(i){
			$scope.radioState = i;
			$scope.noteIsShowing = false;
		};
	}])


	/*
	 * Part 1
	 * Understanding your project or assignment
	 * Understanding a class assignment
	 * Try It 1
	 */
	.controller('part1UnderstandingYourProjectOrAssignmentUnderstandingAClassAssignmentTryIt1', ['$scope', function($scope) {
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
				}
				if($scope.answers[0].value == 4) {
					$scope.popup = 3;
				}								
			} else if(!$scope.answers[0].isCorrect && $scope.answers[1].isCorrect) {
				if($scope.answers[1].value == 3) {
					$scope.popup = 2;
				}
				if($scope.answers[1].value == 4) {
					$scope.popup = 3;
				}
			} else {
				$scope.popup = 4;
			}
		}		
	}])


	/*
	 * Part 1
	 * Understanding your project or assignment
	 * Understanding a class assignment
	 * Try It 2
	 */
	.controller('part1UnderstandingYourProjectOrAssignmentUnderstandingAClassAssignmentTryIt2', ['$scope', function($scope) {
		$scope.popup = 0;
		$scope.answers = []

		$scope.answers[0] = {};
		$scope.answers[0].value = 0;
		$scope.answers[0].isCorrect = false;
		$scope.track1 = {};
		$scope.track1.drop0 = [{title:'audience', class:'draggable draggable-1'}];
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
			stop: function() {
				for(var prop in $scope.track1) {
					if($scope.track1[prop].length > 0) {
						$scope.answers[0].value = prop[4];
						if($scope.answers[0].value == 6) {
							$scope.answers[0].isCorrect = true;
						} else {
							$scope.answers[0].isCorrect = false;
						}
					}
				}
			}
		}

		$scope.getAnswer = function() {
			if($scope.answers[0].isCorrect) {
				$scope.popup = 1;
			} else {
				$scope.popup = 2;
			}
		}		
	}])


	/*
	 * Part 1
	 * Understanding your project or assignment
	 * Understanding a class assignment
	 * Try It 2
	 */
	.controller('part1UnderstandingYourProjectOrAssignmentUnderstandingAClassAssignmentTryIt3', ['$scope', function($scope) {
		$scope.popup = 0;
		$scope.answers = []

		$scope.answers[0] = {};
		$scope.answers[0].value = 0;
		$scope.answers[0].isCorrect = false;
		$scope.track1 = {};
		$scope.track1.drop0 = [{title:'context', class:'draggable draggable-1'}];
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
			stop: function() {
				for(var prop in $scope.track1) {
					if($scope.track1[prop].length > 0) {
						$scope.answers[0].value = prop[4];
						if($scope.answers[0].value == 2 || $scope.answers[0].value == 5 || $scope.answers[0].value == 7) {
							$scope.answers[0].isCorrect = true;
						} else {
							$scope.answers[0].isCorrect = false;
						}
					}
				}
			}
		}

		$scope.getAnswer = function() {
			if($scope.answers[0].isCorrect) {
				$scope.popup = 1;
			} else {
				$scope.popup = 2;
			}
		}		
	}])


	/*
	 * Part 1
	 * Understanding your project or assignment
	 * Understanding other projects
	 * Learn It 2
	 */
	.controller('part1UnderstandingYourProjectOrAssignmentUnderstandingOtherProjectsLearnIt2', ['$scope', function($scope) {
		$scope.radioState = 0;
	}]);
