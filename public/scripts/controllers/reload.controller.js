app.controller('reloadController', ['$scope', '$state', function($scope, $state){
  $scope.reloadRoute = function() {
    $state.reload();
  };
}]);