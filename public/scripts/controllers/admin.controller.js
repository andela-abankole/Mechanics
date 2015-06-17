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
  };
 
  // Create Admin Account
  $scope.upload = function(params) { 
    console.log('button clicked');
    if(!$.isEmptyObject(params)) {
      $scope.$watch('params.files', function(data) {
        Upload.upload({
          url: '/api/admin/register',
          file: $scope.params.files[0],
          data: $scope.params
        }).progress(function(evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            $scope.log = 'progress: ' + progressPercentage + '% ' + evt.config.file.name;
            Materialize.toast($scope.log, 2000);
          })
          .success(function(data, status, headers, config) {
            $scope.file     = JSON.stringify(data.message);
            $scope.params   = {};
            Materialize.toast($scope.file, 4000);
          })
          .error(function(data, status, headers, config) {
            $scope.file     = JSON.stringify(data.message);
            Materialize.toast($scope.file, 2000)
          });
      });
    } else {
      Materialize.toast('Required! Please fill the form', 2000);
    };
  };


  // Login Admin
  $scope.login = function(params) {
      AdminService.login(params)
        .success(function(authSuccess) {
          $scope.params         = {};
          $scope.authSuccess    = authSuccess;
          $scope.verify         = authSuccess.success;          
            if($scope.verify === true) {
              // Change state when user logins in
              Materialize.toast(authSuccess['message'], 2000);
              $scope.adminDetials   = $scope.authSuccess['adminid'];
              $scope.adminID        = $scope.adminDetials['_id'];
               
              // Set Admin Unique ID and Token to Cookie
              $cookies.put('adminID', $scope.adminID);
              $cookies.put('Admintoken', authSuccess.token);
              $state.go('dashboard');
            } else {
              Materialize.toast(authSuccess.message, 2000);
            };
        })
      .error(function(authSuccess) {
        $scope.authSuccess = authSuccess;
        Materialize.toast(authSuccess, 2000);
      });
  };


  // Logout
  $scope.logout = function() {
    $cookies.remove('Admintoken');    
    $cookies.remove('adminID');
    $state.go('logout');
    Materialize.toast('Successfully Signed out!', 2000);
  };

  // Get Admin By ID
   var id = $cookies.get('adminID');
    AdminService.getById(id)
      .success(function(getadminByid) {
        $scope.getadminByid    = getadminByid;
      })
      .error(function(getadminByid) {
        console.log('Error: ' + getadminByid)
      });
  
  // Delete Admin by ID
  $scope.deleteAdmin = function(id) {
    var token = $cookies.get('Admintoken');
    var sendtoken = '?token=' + token;
    AdminService.deleteById(id, sendtoken)
      .success(function(deleteadminByid) {
        Materialize.toast(deleteadminByid['message'], 2000);
        $scope.deleteadminByid  = deleteadminByid;
        $state.reload();
      })
      .error(function(deleteadminByid) {
        Materialize.toast(deleteadminByid['message'], 2000);
      });
  };





// MECHANIC ======================================================

  // Create A New Mechanic from DashBoard
  $scope.createMechanic = function(data) {
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