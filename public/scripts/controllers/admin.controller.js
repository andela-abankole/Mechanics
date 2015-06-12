app.controller('adminController', ['$scope', '$http', 'MechanicService', 'AdminService', '$state', function($scope, $http, MechanicService, AdminService, $state){

  // All Admin 
  AdminService.get()
  .success( getData ) 
  .error( getData );

  function getData (data) {
    $scope.data = data;
    console.log('admin',  $scope.data)
  };

  // Create Admin Account
  $scope.createAdmin = function(formAdmin) {
    console.log('button clicked');
    if(!$.isEmptyObject(formAdmin)) {
      AdminService.create(formAdmin)
        .success(function(formAdmin) {
          $scope.params   = {};
          $scope.Admins   = formAdmin;
          console.log('testing Admins', $scope.Admins)
        })
      .error(function(formAdmin) {
        $scope.params = formAdmin;
      })
    } else {
      console.log('nothing happened')
    }
  };

  // Login Admin
  $scope.login = function(params) {
    console.log('button clicked');
      AdminService.login(params)
        .success(function(authSuccess) {
          $scope.params   = {};
          $scope.authSuccess = authSuccess;
          $scope.viewAdminSuccess = $scope.authSuccess['adminid'];
          $state.go('dashboard');
          console.log("data", $scope.viewAdminSuccess);
        })
      .error(function(username) {
        $scope.params = username;
      })
  };






  // Create A New Mechanic from DashBoard
  $scope.createMechanic = function(data) {
    console.log('button clicked');
    if(!$.isEmptyObject(data)) {
      MechanicService.create(data)
        .success(function(data) {
          $scope.params     = {};
          $scope.mechanics  = data;
          console.log("data", data);
        })
      .error(function(data) {
        $scope.params = data;
      })
    } else {
      console.log('nothing happened')
    }
  };
}]);