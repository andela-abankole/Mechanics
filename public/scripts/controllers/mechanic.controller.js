app.controller('mechanicController', ['$scope', '$http', 'MechanicService', function($scope, $http, MechanicService){
  
  // Get All Mechanic
  MechanicService.get()
    .success( getData ) 
    .error( getData );

  function getData (data) {
    $scope.data = data;
  };

}])