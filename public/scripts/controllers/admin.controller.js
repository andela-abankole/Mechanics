app.controller('adminController', ['$scope', '$http', 'MechanicService', 'AdminService', '$state', '$cookies', 'Upload', function($scope, $http, MechanicService, AdminService, $state, $cookies, Upload){

  if (!AdminService.getUser()) {
    $state.go('admin');
  }

  // Get All Admin 
  AdminService.get()
  .success( getData ) 
  .error( getData );

  function getData (data) {
    $scope.data = data;
    var checkadmin = $cookies.get('AdminStatus');
    if (checkadmin === 'true') {
      $scope.currentadmin = checkadmin;
    } else {
      console.log('false')
    }
  };
 
  // Create Admin Account
  $scope.upload = function(params) { 
    if (!$.isEmptyObject(params)) {
      $scope.$watch('params.files', function(data) {
        Upload.upload({
          url: '/api/admin/register',     // Register
          file: $scope.params.files[0],   // Image to upload
          data: $scope.params             // Other Admin details
        }).progress(function(evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            $scope.log = 'Uploading Image: ' + progressPercentage + '%';
            Materialize.toast($scope.log, 2000);
          })
          .success(function(data, status, headers, config) {
            $scope.file     = JSON.stringify(data.message);
            $state.reload();
            Materialize.toast($scope.file, 4000);
          })
          .error(function(data, status, headers, config) {
            $scope.err     = JSON.stringify(data.err);
            console.log('message', $scope.err);
            Materialize.toast($scope.err + '! A user with that username or email already exists', 3000)
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
              $scope.adminStatus    = $scope.adminDetials['admin']

              // Set Admin Unique ID, Status and Token to Cookie
              $cookies.put('adminID', $scope.adminID);
              $cookies.put('Admintoken', authSuccess.token);
              $cookies.put('AdminStatus', $scope.adminStatus)
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
    $cookies.remove('AdminStatus');
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

  /**
   * [status&token Define cookies here and status]
   * @type {[Global]}
   */
  var status      = $cookies.get('AdminStatus'),
      token       = $cookies.get('Admintoken'),
      sendtoken   = '?token=' + token,
      currentTime = Date.now;

  // Edit Admin by ID
  $scope.editAdmin = function(id) {
    // activates modal services
    $('#editAdmin').openModal({
      dismissible: true, // Modal can be dismissed by clicking outside of the modal
      opacity: .7, // Opacity of modal background
    });

    if (String(status) === "true") { 
      AdminService.getById(id)
        .success(function(response){
          $scope.params = response;
        })
    };
  };

  // Update Admin by ID
  $scope.updateAdmin = function(params) {
    if (String(status) === "true") {
      if (typeof $scope.params.files === 'undefined') { 
        $scope.params.files = [{}];
      }

      Upload.upload({
        url: 'api/admin/' + params._id + sendtoken,
        method: 'PUT',
        data: $scope.params,
        file: $scope.params.files[0]
      }).progress(function(evt) {
          var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
          $scope.log = 'Uploading Image: ' + progressPercentage + '%';
          Materialize.toast($scope.log, 2000);
      })
      .success(function(data, status, headers, config) {
        $state.reload();
        Materialize.toast(data.message, 2000);
      })
    };
  };

  // Delete Admin by ID
  $scope.deleteAdmin = function(id) {
    if (String(status) === "true") { 
      AdminService.deleteById(id, sendtoken)
        .success(function(deleteadminByid) {
          Materialize.toast(deleteadminByid['message'], 2000);
          $scope.deleteadminByid  = deleteadminByid;
          $state.reload();
        })
        .error(function(deleteadminByid) {
          Materialize.toast(deleteadminByid['message'], 2000);
        });
    } else {
      Materialize.toast('Unable to Delete, Please contact Admin if you want to delete your account', 2000);
    };
  };


// MECHANIC ======================================================

  // Create A New Mechanic from DashBoard
  $scope.createMechanic = function(params) { 
    if (!$.isEmptyObject(params)) {
      $scope.$watch('params.files', function(data) {
        Upload.upload({
          url: '/api/mechanics',
          file: $scope.params.files[0],
          data: $scope.params
        }).progress(function(evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            $scope.log = 'Uploading Image: ' + progressPercentage + '%';
            Materialize.toast($scope.log, 2000);
          })
          .success(function(data, status, headers, config) {
            $scope.file     = JSON.stringify(data.message);
            $state.reload();
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

  // Edit Mechanic by ID
  $scope.editMechanic = function(id) {
    // activates modal services
    $('#editMechanic').openModal({
      dismissible: true, // Modal can be dismissed by clicking outside of the modal
      opacity: .7, // Opacity of modal background
    });

    if (String(status) === "true" || String(status) === "false") { 
      MechanicService.getById(id)
        .success(function(response){
          $scope.params = response;
        })
    }
  };

  // Update Mechanic by ID
  $scope.updateMechanic = function(params) {
    if (String(status) === "true" || String(status) === "false") {
      if (typeof $scope.params.files === 'undefined') {
        $scope.params.files = [{}];
      };

      Upload.upload({
        url: 'api/mechanics/' + params._id + sendtoken,
        method: 'PUT',
        data: $scope.params,
        file: $scope.params.files[0]
      }).progress(function(evt) {
        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
        $scope.log = 'Uploading Image: ' + progressPercentage + '%';
        Materialize.toast($scope.log, 2000);
      })
      .success(function(data, status, headers, config) {
        $state.reload();
        Materialize.toast(data.message, 2000);
      })
    };
  };

  // Delete Mechanic by ID
  $scope.deleteMechanic = function(id) {
    MechanicService.deleteById(id)
      .success(function(deletemechByid){
        Materialize.toast(deletemechByid['message'], 2000);
        $scope.deletemechByid = deletemechByid;
        $state.reload();
      })
      .error(function(deletemechByid){
        Materialize.toast(deletemechByid['message'], 2000);
      });
  };
}]);