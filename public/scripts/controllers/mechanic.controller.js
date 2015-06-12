app.controller('mechanicController', ['$scope', '$http', 'MechanicService', function($scope, $http, MechanicService){
  
  MechanicService.get()
    .success( getData ) 
    .error( getData );

  function getData (data) {
    $scope.data = data;
    console.log('userdata',  $scope.data)
  };

  //   fullname = $scope.fullname,
  //   skill = $scope.skill,
  //   phone_no = $scope.phone_no,
  //   email = $scope.email,
  //   organisation = $scope.organisation,
  //   location = $scope.location,
  //   available = $scope.available
  // };




  // $scope.createMechanic = function() {
  //   console.log('button clicked')
  //   if(!$.isEmptyObject($scope.formMechanic)) {
  //   mechanicService.create($scope.formMechanic)
  //     .success(function(data) {
  //       $scope.formMechanic = {};
  //       $scope.mechanics    = data;
  //       console.log("mechanics", $scope.mechanics);
  //       console.log("data", data);
  //     })
  //     .error(function(data) {
  //       console.log('Error: ' + data);
  //     })
  //   } else {
  //     console.log('nothing happened')
  //   }
  // };

  // $scope.deleteMechanic = function(id) {
  //   mechanicService.delete(id)
  //     .success(function(data) {
  //       $scope.mechanics  = data;
  //       console.log(data);
  //     })
  //     .error(function(data) {
  //       console.log('Error: ' + data);
  //     });
  //};
}])