var module = angular.module('handbook', []);

module.controller('what-is-composing-ctrl', ['$scope', function($scope) {
  $scope.isOpen = false;

  $scope.showPopup = function() {
    $scope.isOpen = !$scope.isOpen;
  };
}]);
