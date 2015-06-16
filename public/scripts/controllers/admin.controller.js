app.controller('adminController', ['$scope', '$http', 'MechanicService', 'AdminService', '$state', '$cookies', 'Upload', function($scope, $http, MechanicService, AdminService, $state, $cookies, Upload){

  if(!AdminService.getUser()){
    $state.go('admin');
  } 

  // Get All Admin 
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
          Materialize.toast(formAdmin['message'], 2000);
          console.log('testing Admins', $scope.Admins)
        })
      .error(function(formAdmin) {
        Materialize.toast(formAdmin['message'], 2000)
        $scope.params = formAdmin;
      })
    } else {
      console.log('nothing happened')
      Materialize.toast('REQUIRED! Please fill the form', 2000);
    }
  };

  // Login Admin
  $scope.login = function(params) {
    console.log('button clicked');
      AdminService.login(params)
        .success(function(authSuccess) {
          $scope.params         = {};
          $scope.authSuccess    = authSuccess;
          $scope.verify         = authSuccess.success;          
            if($scope.verify === true) {
              // Change state when user logins in
              Materialize.toast(authSuccess['message'], 2000);
              $scope.adminDetials   = $scope.authSuccess['adminid'];
              $scope.adminID        = $scope.adminDetials['_id']
              console.log('details', $scope.adminDetials);
              console.log("message", $scope.adminID);
               
              // Set Admin Unique ID and Token to Cookie
              $cookies.put('adminID', $scope.adminID);
              $cookies.put('Admintoken', authSuccess.token);
              $state.go('dashboard');
            } else {
              Materialize.toast(authSuccess.message, 2000);
              console.log('error', authSuccess.success, authSuccess.message);
            };
        })
      .error(function(authSuccess) {
        Materialize.toast(authSuccess, 2000);
        $scope.authSuccess = authSuccess;
        console.log($scope.authSuccess);
      })

  };

  // Logout
  $scope.logout = function() {
    $cookies.remove('adminID');
    $cookies.remove('Admintoken');
    $state.go('logout');
    Materialize.toast('Successfully Signed out!', 2000);
  };

  // Get Admin By ID
   var id = $cookies.get('adminID');
    AdminService.getById(id)
      .success(function(getadminByid) {
        $scope.getadminByid    = getadminByid;
        console.log('adminbyid', getadminByid);
      })
      .error(function(getadminByid) {
        console.log('Error: ' + getadminByid)
      });
  
  // Delete Admin by ID
  $scope.deleteAdmin = function(id) {
    var token = $cookies.get('Admintoken');
    var sendtoken = '?token=' + token;
    console.log('token', sendtoken)
    AdminService.deleteById(id, sendtoken)
      .success(function(deleteadminByid) {
        Materialize.toast(deleteadminByid['message'], 2000);
        $scope.deleteadminByid  = deleteadminByid;
        console.log('success', deleteadminByid);
        $state.reload();
      })
      .error(function(deleteadminByid) {
        console.log('Error: ' + deleteadminByid);
        Materialize.toast(deleteadminByid['message'], 2000);
      });
  };





// MECHANIC ======================================================

  // Create A New Mechanic from DashBoard
  $scope.createMechanic = function(data) {
    console.log('button clicked');
    if(!$.isEmptyObject(data)) {
      MechanicService.create(data)
        .success(function(data) {
          $scope.params     = {};
          $scope.mechanics  = data;
          console.log("data", data.success);
          Materialize.toast(data['message'], 2000);
        })
      .error(function(data) {
      Materialize.toast(data['message'], 2000);
        $scope.params = data;
      })
    } else {
      console.log('nothing happened')
      Materialize.toast('REQUIRED! Please fill the form', 2000);
    }
  };

  // Delete Mechanic by ID
  $scope.deleteMechanic = function(id) {
    MechanicService.deleteById(id)
      .success(function(deletemechByid){
        Materialize.toast(deletemechByid['message'], 2000);
        $scope.deletemechByid = deletemechByid;
        console.log('success', deletemechByid)
        $state.reload();
      })
      .error(function(deletemechByid){
        Materialize.toast(deletemechByid['message'], 2000);
        console.log('Error:' + deletemechByid)
      });
  };

  // Update Mechanic by ID
  $scope.updateMechanic = function(id) {
    console.log('mechanic id', id)
    MechanicService.updateById(id)
      .success(function(updatemechByid){
        Materialize.toast(updatemechByid['message'], 2000);
        $scope.updatemechByid = updatemechByid;
        console.log('success', updatemechByid)
        $state.reload();
      })
      .error(function(updatemechByid){
        Materialize.toast(updatemechByid['message'], 2000);
        console.log('Error:' + updatemechByid)
      });
  };
}]);